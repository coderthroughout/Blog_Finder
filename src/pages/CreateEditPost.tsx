import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, X, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { getPostById } from '../services/posts';
import { Post } from '../types';

interface PostFormValues {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
}

const CreateEditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createPost, updatePost } = usePosts();
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<PostFormValues>();
  const coverImageValue = watch('coverImage');
  
  useEffect(() => {
    if (isEditMode && id) {
      const fetchPost = async () => {
        try {
          const postData = await getPostById(id);
          
          if (!postData) {
            setError('Post not found');
            return;
          }
          
          if (user?.id !== postData.authorId) {
            setError('You do not have permission to edit this post');
            navigate('/dashboard');
            return;
          }
          
          setPost(postData);
          
          // Set form values
          setValue('title', postData.title);
          setValue('excerpt', postData.excerpt);
          setValue('content', postData.content);
          setValue('coverImage', postData.coverImage || '');
          
          // Set tags
          if (postData.tags) {
            setTags(postData.tags);
          }
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post');
        } finally {
          setLoading(false);
        }
      };
      
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id, isEditMode, setValue, navigate, user]);
  
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const onSubmit = async (data: PostFormValues) => {
    if (!user) {
      setError('You must be logged in to create or edit posts');
      return;
    }
    
    try {
      const postData = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        tags,
      };
      
      if (isEditMode && id) {
        await updatePost(id, postData);
        navigate(`/post/${id}`);
      } else {
        const newPost = await createPost(postData);
        navigate(`/post/${newPost.id}`);
      }
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post');
    }
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-md">
          <p className="text-error-600 dark:text-error-400">{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Title"
            placeholder="Enter a descriptive title for your post"
            error={errors.title?.message}
            {...register('title', { 
              required: 'Title is required',
              minLength: {
                value: 10,
                message: 'Title must be at least 10 characters',
              }
            })}
          />
          
          <Textarea
            label="Excerpt"
            placeholder="Write a brief summary of your post (will be displayed in previews)"
            error={errors.excerpt?.message}
            {...register('excerpt', { 
              required: 'Excerpt is required',
              minLength: {
                value: 20,
                message: 'Excerpt must be at least 20 characters',
              },
              maxLength: {
                value: 300,
                message: 'Excerpt must be no more than 300 characters',
              }
            })}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <div className="mb-2">
              <Input
                placeholder="Enter the URL of your cover image"
                leftIcon={<ImageIcon size={16} />}
                error={errors.coverImage?.message}
                {...register('coverImage')}
              />
            </div>
            
            {coverImageValue && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <img
                  src={coverImageValue}
                  alt="Cover preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                  }}
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
            </label>
            <div className="flex mb-2">
              <Input
                placeholder="Add tags to categorize your post"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="rounded-r-none"
              />
              <Button
                type="button"
                onClick={addTag}
                className="rounded-l-none"
                disabled={!tagInput.trim()}
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <div 
                  key={tag}
                  className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full flex items-center text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800/40 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {tags.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tags added yet
                </p>
              )}
            </div>
          </div>
          
          <Textarea
            label="Content"
            placeholder="Write your post content using Markdown..."
            className="min-h-[400px]"
            error={errors.content?.message}
            {...register('content', { 
              required: 'Content is required',
              minLength: {
                value: 100,
                message: 'Content must be at least 100 characters',
              }
            })}
          />
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              leftIcon={isEditMode ? <Save size={16} /> : <Plus size={16} />}
            >
              {isEditMode ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateEditPost;