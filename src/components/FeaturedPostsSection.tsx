import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Post } from '../types';
import PostCard from './PostCard';

interface FeaturedPostsSectionProps {
  posts: Post[];
  loading?: boolean;
}

const FeaturedPostsSection: React.FC<FeaturedPostsSectionProps> = ({ posts, loading = false }) => {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-5 space-y-4">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="flex justify-between">
                    <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Featured posts
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/explore"
          className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline transition-all"
        >
          Explore more posts
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPostsSection;
