import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateEditPost from './pages/CreateEditPost';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/post/:id" element={<PostDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/about" element={<About />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/new-post" 
                    element={
                      <ProtectedRoute>
                        <CreateEditPost />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/edit-post/:id" 
                    element={
                      <ProtectedRoute>
                        <CreateEditPost />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Fallback for 404 */}
                  <Route path="*" element={
                    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 text-center">
                      <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
                        <a href="/" className="btn btn-primary">Back to Home</a>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;