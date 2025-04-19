import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Calendar, Clock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { usePosts } from '../context/PostContext';
import CommentSection from '../components/CommentSection';
import { Post } from '../types';
import { formatDate } from '../utils/mockData';
import PostCard from '../components/PostCard';
import Button from '../components/ui/Button';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, likePost, loading, error } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    if (!id) return;
    
    const fetchPostData = async () => {
      const foundPost = posts.find(p => p.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Find related posts (same tags or author)
        const related = posts.filter(p => 
          p.id !== id && (
            p.authorId === foundPost.authorId || 
            p.tags?.some(tag => foundPost.tags?.includes(tag))
          )
        ).slice(0, 3);
        
        setRelatedPosts(related);
      }
    };
    
    fetchPostData();
  }, [id, posts]);
  
  const handleLike = () => {
    if (id) {
      likePost(id);
      
      // Update local post state
      if (post) {
        setPost({
          ...post,
          likes: post.likes + 1
        });
      }
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Post Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          variant="primary"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Post Header */}
      <header className="bg-white dark:bg-gray-900 py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              to="/"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                    className="text-xs font-medium bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 px-2.5 py-0.5 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800/40 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {post.title}
            </h1>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {post.author?.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center mr-3">
                  {post.author?.name.charAt(0) || 'U'}
                </div>
              )}
              
              <div>
                <Link
                  to={`/author/${post.authorId}`}
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {post.author?.name}
                </Link>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  <span>{formatDate(post.createdAt)}</span>
                  <span className="mx-1">•</span>
                  <Clock size={12} className="mr-1" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
            
            <button
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={handleLike}
              aria-label="Like post"
            >
              <Heart size={18} />
              <span>{post.likes}</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        </div>
      )}
      
      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose dark:prose-invert prose-lg max-w-none blog-content">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      
      {/* Comments Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200 dark:border-gray-800">
        <CommentSection postId={post.id} />
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Related Posts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PostDetail;