import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';
import FeaturedPostsSection from '../components/FeaturedPostsSection';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const { posts, featuredPosts, loading, error, fetchPosts } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length === 0 && !loading && !error) {
      fetchPosts();
    }
  }, [posts.length, loading, error, fetchPosts]);

  const renderRecentPosts = () => {
    if (loading) {
      return (
        <div className="animate-pulse space-y-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 md:w-2/3 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-error-500 mb-4">Error loading posts</p>
          <Button onClick={() => fetchPosts()}>Try Again</Button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {posts.slice(0, 4).map(post => (
          <PostCard key={post.id} post={post} featured />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Where <span className="text-primary-600 dark:text-primary-400">Ideas</span> Flow
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/explore')}>
              Start Reading
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/signup')}>
              Start Writing
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPostsSection posts={featuredPosts} loading={loading} />

      {/* Recent Posts */}
      <section
        aria-labelledby="recent-posts-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2
            id="recent-posts-heading"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            Recent Posts
          </h2>
          <Link
            to="/explore"
            className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {renderRecentPosts()}

        <div className="mt-10 text-center">
          <Button size="lg" variant="outline" onClick={() => navigate('/explore')}>
            Load More
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 dark:bg-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to share your ideas?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join our community of writers and readers. Create an account to start writing your own stories.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary-700 hover:bg-gray-100"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
