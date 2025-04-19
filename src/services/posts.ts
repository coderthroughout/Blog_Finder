import { Post, Comment } from '../types';
import { posts, comments, getAuthor, featuredPosts as mockFeaturedPosts } from '../utils/mockData';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


let postsData = [...posts];
let commentsData = [...comments];

export const getAllPosts = async (): Promise<Post[]> => {
  await delay(800);
  
  
  return postsData.map(post => ({
    ...post,
    author: getAuthor(post.authorId),
  }));
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  await delay(600);
  
  return mockFeaturedPosts;
};

export const getPostById = async (id: string): Promise<Post | null> => {
  await delay(500);
  
  const post = postsData.find(p => p.id === id);
  
  if (!post) {
    return null;
  }
  
  return {
    ...post,
    author: getAuthor(post.authorId),
  };
};

export const createPost = async (authorId: string, postData: Omit<Post, 'id' | 'authorId' | 'author' | 'createdAt' | 'updatedAt' | 'likes' | 'commentsCount'>): Promise<Post> => {
  await delay(1000);
  
  const now = new Date().toISOString();
  
  const newPost: Post = {
    id: `${postsData.length + 1}`,
    authorId,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    commentsCount: 0,
    ...postData,
  };
  
  postsData = [newPost, ...postsData];
  
  return {
    ...newPost,
    author: getAuthor(authorId),
  };
};

export const updatePost = async (id: string, authorId: string, postData: Partial<Post>): Promise<Post> => {
  await delay(800);
  
  const postIndex = postsData.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  // Check if the user is the author of the post
  if (postsData[postIndex].authorId !== authorId) {
    throw new Error('Unauthorized');
  }
  
  const updatedPost = {
    ...postsData[postIndex],
    ...postData,
    updatedAt: new Date().toISOString(),
  };
  
  postsData[postIndex] = updatedPost;
  
  return {
    ...updatedPost,
    author: getAuthor(authorId),
  };
};

export const deletePost = async (id: string, authorId: string): Promise<boolean> => {
  await delay(700);
  
  const postIndex = postsData.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  

  if (postsData[postIndex].authorId !== authorId) {
    throw new Error('Unauthorized');
  }
  
  postsData = postsData.filter(p => p.id !== id);
  

  commentsData = commentsData.filter(c => c.postId !== id);
  
  return true;
};

export const likePost = async (id: string): Promise<void> => {
  await delay(300);
  
  const postIndex = postsData.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  postsData[postIndex] = {
    ...postsData[postIndex],
    likes: postsData[postIndex].likes + 1,
  };
};

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  await delay(600);
  
  const postComments = commentsData
    .filter(c => c.postId === postId)
    .map(comment => ({
      ...comment,
      author: getAuthor(comment.authorId),
    }));
  
  return postComments;
};

export const addComment = async (postId: string, authorId: string, content: string): Promise<Comment> => {
  await delay(700);
  
  const now = new Date().toISOString();
  
  const newComment: Comment = {
    id: `${commentsData.length + 1}`,
    postId,
    authorId,
    content,
    createdAt: now,
  };
  
  commentsData = [...commentsData, newComment];
  
  // Update comment count on the post
  const postIndex = postsData.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    postsData[postIndex] = {
      ...postsData[postIndex],
      commentsCount: postsData[postIndex].commentsCount + 1,
    };
  }
  
  return {
    ...newComment,
    author: getAuthor(authorId),
  };
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  await delay(600);
  
  const normalizedQuery = query.toLowerCase();
  
  const filteredPosts = postsData.filter(post => 
    post.title.toLowerCase().includes(normalizedQuery) || 
    post.content.toLowerCase().includes(normalizedQuery) ||
    post.excerpt.toLowerCase().includes(normalizedQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
  
  return filteredPosts.map(post => ({
    ...post,
    author: getAuthor(post.authorId),
  }));
};

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  await delay(500);
  
  const filteredPosts = postsData.filter(post => 
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
  
  return filteredPosts.map(post => ({
    ...post,
    author: getAuthor(post.authorId),
  }));
};

export const getPostsByAuthor = async (authorId: string): Promise<Post[]> => {
  await delay(500);
  
  const filteredPosts = postsData.filter(post => post.authorId === authorId);
  
  return filteredPosts.map(post => ({
    ...post,
    author: getAuthor(authorId),
  }));
};
