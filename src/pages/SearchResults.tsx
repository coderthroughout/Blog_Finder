import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import Button from '../components/ui/Button';
import { searchPosts } from '../services/posts';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const posts = await searchPosts(query);
        setResults(posts);
      } catch (err) {
        console.error('Error searching posts:', err);
        setError('Failed to search posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [query]);
  
  // Extract all unique tags from search results
  const allTags = Array.from(
    new Set(
      results.flatMap(post => post.tags || [])
    )
  ).sort();
  
  // Filter results by active tag if one is selected
  const filteredResults = activeTag
    ? results.filter(post => post.tags?.includes(activeTag))
    : results;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <Link
          to="/"
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mr-4"
        >
          <ArrowLeft size={18} className="mr-1" />
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 flex items-center shadow-sm flex-1">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-600 dark:text-gray-400 mr-2">Results for:</span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {query}
          </h1>
        </div>
      </div>
      
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Filter by tag:
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTag === null
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="animate-pulse space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 md:w-2/3 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-error-500 mb-4">{error}</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            No results found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any posts matching your search{activeTag ? ` with the tag "${activeTag}"` : ''}.
          </p>
          <Link to="/">
            <Button>
              Back to Home
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            {activeTag ? ` with tag "${activeTag}"` : ''}
          </p>
          
          {filteredResults.map(post => (
            <PostCard key={post.id} post={post} featured />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;