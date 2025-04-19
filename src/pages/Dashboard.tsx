import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { getPostsByAuthor } from '../services/posts';
import Button from '../components/ui/Button';
import { formatDate } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { deletePost } = usePosts();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const posts = await getPostsByAuthor(user.id);
        setUserPosts(posts);
      } catch (err) {
        console.error('Error fetching user posts:', err);
        setError('Failed to load your posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      setUserPosts(prev => prev.filter(post => post.id !== id));
      setPostToDelete(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-warning-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be logged in to access your dashboard.
          </p>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </div>
    );
  }

  const renderPostCard = (post: Post) => (
    <div
      key={post.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <Link
            to={`/post/${post.id}`}
            className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {post.title}
          </Link>
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>Published: {formatDate(post.createdAt)}</span>
            <span className="mx-2">•</span>
            <span>{post.likes} likes</span>
            <span className="mx-2">•</span>
            <span>{post.commentsCount} comments</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Pencil size={16} />}
            onClick={() => navigate(`/edit-post/${post.id}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-error-600 dark:text-error-400 border-error-300 dark:border-error-800 hover:bg-error-50 dark:hover:bg-error-900/30"
            leftIcon={<Trash2 size={16} />}
            onClick={() => setPostToDelete(post.id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {(post.tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {(post.tags ?? []).map(tag => (
            <span
              key={tag}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Your Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your blog posts and content</p>
        </div>

        <Button
          className="mt-4 md:mt-0"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/new-post')}
        >
          Create New Post
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 rounded-md">
          <p className="text-error-600 dark:text-error-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="flex justify-end space-x-2">
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : userPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            You haven't created any posts yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start writing and sharing your ideas with the world!
          </p>
          <Button onClick={() => navigate('/new-post')}>Create Your First Post</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {userPosts.map(renderPostCard)}
        </div>
      )}

      {postToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setPostToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="outline"
                className="text-error-600 dark:text-error-400 border-error-300 dark:border-error-800 hover:bg-error-50 dark:hover:bg-error-900/30"
                onClick={() => handleDeletePost(postToDelete)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;