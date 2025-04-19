import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, PostContextType } from '../types';
import { 
  getAllPosts, 
  getFeaturedPosts, 
  getPostById, 
  createPost as createPostApi, 
  updatePost as updatePostApi,
  deletePost as deletePostApi,
  likePost as likePostApi
} from '../services/posts';
import { useAuth } from './AuthContext';

// Create context with default values
const PostContext = createContext<PostContextType>({
  posts: [],
  featuredPosts: [],
  loading: true,
  error: null,
  fetchPosts: async () => {},
  fetchPostById: async () => null,
  createPost: async () => ({ 
    id: '', 
    title: '', 
    content: '', 
    excerpt: '', 
    authorId: '', 
    createdAt: '', 
    updatedAt: '', 
    likes: 0, 
    commentsCount: 0 
  }),
  updatePost: async () => ({ 
    id: '', 
    title: '', 
    content: '', 
    excerpt: '', 
    authorId: '', 
    createdAt: '', 
    updatedAt: '', 
    likes: 0, 
    commentsCount: 0 
  }),
  deletePost: async () => false,
  likePost: async () => {},
});

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();

  // Fetch posts on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchPosts();
      } catch (err) {
        console.error('Error loading initial posts data:', err);
      }
    };

    loadInitialData();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [allPosts, featured] = await Promise.all([
        getAllPosts(),
        getFeaturedPosts()
      ]);
      
      setPosts(allPosts);
      setFeaturedPosts(featured);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostById = async (id: string): Promise<Post | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const post = await getPostById(id);
      return post;
    } catch (err) {
      setError('Failed to fetch post');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<Post, 'id' | 'authorId' | 'author' | 'createdAt' | 'updatedAt' | 'likes' | 'commentsCount'>) => {
    setLoading(true);
    setError(null);
    
    if (!user) {
      setError('You must be logged in to create a post');
      setLoading(false);
      throw new Error('Not authenticated');
    }
    
    try {
      const newPost = await createPostApi(user.id, postData);
      setPosts(prevPosts => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, postData: Partial<Post>) => {
    setLoading(true);
    setError(null);
    
    if (!user) {
      setError('You must be logged in to update a post');
      setLoading(false);
      throw new Error('Not authenticated');
    }
    
    try {
      const updatedPost = await updatePostApi(id, user.id, postData);
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? updatedPost : post
        )
      );
      
      return updatedPost;
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    setLoading(true);
    setError(null);
    
    if (!user) {
      setError('You must be logged in to delete a post');
      setLoading(false);
      throw new Error('Not authenticated');
    }
    
    try {
      await deletePostApi(id, user.id);
      
      setPosts(prevPosts => 
        prevPosts.filter(post => post.id !== id)
      );
      
      return true;
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (id: string) => {
    setError(null);
    
    try {
      await likePostApi(id);
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id 
            ? { ...post, likes: post.likes + 1 } 
            : post
        )
      );
      
      setFeaturedPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id 
            ? { ...post, likes: post.likes + 1 } 
            : post
        )
      );
    } catch (err) {
      setError('Failed to like post');
      console.error(err);
    }
  };

  const value = {
    posts,
    featuredPosts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// Custom hook to use the post context
export const usePosts = () => {
  const context = useContext(PostContext);
  
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  
  return context;
};