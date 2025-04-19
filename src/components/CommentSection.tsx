import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, Send } from 'lucide-react';
import { Comment } from '../types';
import { useAuth } from '../context/AuthContext';
import { getPostComments, addComment } from '../services/posts';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import { formatDate } from '../utils/mockData';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ content: string }>();
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getPostComments(postId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [postId]);
  
  const onSubmit = async (data: { content: string }) => {
    if (!user) return;
    
    setSubmitting(true);
    
    try {
      const newComment = await addComment(postId, user.id, data.content);
      setComments(prev => [newComment, ...prev]);
      reset();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <section id="comments" className="mt-10">
      <div className="mb-6 flex items-center">
        <MessageCircle className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h2>
      </div>
      
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <Textarea
            label="Add a comment"
            placeholder="Share your thoughts..."
            error={errors.content?.message}
            {...register('content', { 
              required: 'Comment cannot be empty',
              minLength: {
                value: 3,
                message: 'Comment must be at least 3 characters',
              }
            })}
          />
          
          <div className="flex justify-end">
            <Button
              type="submit"
              rightIcon={<Send size={16} />}
              isLoading={submitting}
            >
              Post Comment
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            You need to be logged in to comment.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.location.href = '/login'}
          >
            Log In
          </Button>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0">
              <div className="flex items-center mb-2">
                {comment.author?.avatar ? (
                  <img 
                    src={comment.author.avatar} 
                    alt={comment.author.name} 
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center mr-3">
                    {comment.author?.name.charAt(0) || 'U'}
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {comment.author?.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
              
              <div className="pl-11">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}
    </section>
  );
};

export default CommentSection;