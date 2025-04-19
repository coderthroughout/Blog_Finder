import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Calendar, Clock } from 'lucide-react';
import { Post } from '../types';
import { formatDate } from '../utils/mockData';
import { usePosts } from '../context/PostContext';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const { likePost } = usePosts();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    likePost(post.id);
  };

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <article
      className={`card overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer ${
        featured ? 'lg:flex' : ''
      }`}
      onClick={handleClick}
    >
      {post.coverImage && (
        <div className={`${featured ? 'lg:w-2/5 h-48 lg:h-auto' : 'h-48'} overflow-hidden`}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
      )}

      <div className={`p-6 ${featured ? 'lg:w-3/5' : ''}`}>
        {(post.tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {(post.tags ?? []).map((tag) => (
              <Link
                key={tag}
                to={`/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs font-medium bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 px-2.5 py-0.5 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800/40 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center mb-4">
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center mr-3 font-medium">
              {post.author?.name?.charAt(0) || 'U'}
            </div>
          )}

          <div>
            <Link
              to={`/author/${post.authorId}`}
              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author?.name}
            </Link>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
              <span className="mx-1">•</span>
              <Clock size={12} className="mr-1" />
              <span>5 min read</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mt-2">
          <button
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={handleLike}
            aria-label="Like post"
          >
            <Heart size={16} className="mr-1" />
            <span>{post.likes}</span>
          </button>

          <Link
            to={`/post/${post.id}#comments`}
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="View comments"
          >
            <MessageCircle size={16} className="mr-1" />
            <span>{post.commentsCount}</span>
          </Link>

          <Link
            to={`/post/${post.id}`}
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
