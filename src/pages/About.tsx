import React from 'react';
import { PenTool, Users, Shield, Globe } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            About <span className="text-primary-600 dark:text-primary-400">InkFlow</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering writers. Engaging readers. Celebrating storytelling.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              InkFlow was born from a simple yet powerful idea — that everyone has a story worth telling. Our mission is to cultivate a digital space where ideas, creativity, and voices flow freely between writers and readers.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you're refining your craft or discovering new perspectives, InkFlow is your creative partner and literary home.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Writer at work" 
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Creative Freedom',
                icon: <PenTool className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
                text: 'We give writers the freedom to create authentically, encouraging boldness and individuality.',
              },
              {
                title: 'Community Connection',
                icon: <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
                text: 'Our platform fosters meaningful relationships between passionate creators and curious readers.',
              },
              {
                title: 'Content Integrity',
                icon: <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
                text: 'We value depth, accuracy, and the kind of content that enlightens and informs.',
              },
              {
                title: 'Inclusive Platform',
                icon: <Globe className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
                text: 'We celebrate diverse voices and strive for accessibility across all backgrounds.',
              },
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full inline-flex mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alexander Chen',
                role: 'Founder & CEO',
                desc: 'Former journalist and tech enthusiast who built InkFlow to empower modern storytelling.',
                img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
              },
              {
                name: 'Sarah Johnson',
                role: 'Head of Content',
                desc: 'Bestselling author shaping our editorial vision and nurturing community-led narratives.',
                img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
              },
              {
                name: 'Marcus Rivera',
                role: 'CTO',
                desc: 'Full-stack engineer and UX expert passionate about intuitive digital writing tools.',
                img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
              },
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm text-center">
                <img 
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 dark:bg-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Ready to share your voice with the world? Become part of InkFlow and start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary-700 hover:bg-gray-100"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-primary-700"
              onClick={() => window.location.href = '/explore'}
            >
              Explore Content
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
