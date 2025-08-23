import React from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Users, Award } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const Home: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: 'Advanced Trading Strategies',
      description: 'Learn cutting-edge crypto trading techniques from industry experts.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Live Community',
      description: 'Join thousands of traders in our active Telegram community.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: 'Certified Courses',
      description: 'Get certified in blockchain and cryptocurrency trading.'
    },
    {
      icon: <Play className="w-8 h-8 text-red-600" />,
      title: 'Live Sessions',
      description: 'Participate in daily live trading sessions and market analysis.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Krishna Tech Guru</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master the art of cryptocurrency trading with our comprehensive courses, live sessions, and expert guidance. Join thousands of successful traders today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Explore Courses
              </Link>
              <Link
                to="/live"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200"
              >
                Join Live Session
              </Link>
            </div>
          </div>

          {/* Image Carousel */}
          <ImageCarousel />
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-blue-600 py-4 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content text-white text-lg font-semibold">
            🚀 New Bitcoin Course Available! | 💰 Special Discount: 50% OFF on All Courses | 📈 Join Live Trading Every Day at 9 AM IST | 🎯 Over 10,000+ Successful Students | 💎 Expert Analysis & Signals Daily | 🔥 Limited Time Offer - Enroll Now!
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Krishna Tech Guru?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive crypto education with practical, real-world trading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Watch Our Latest Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* YouTube Video Placeholders */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">Bitcoin Analysis Today</h3>
                <p className="text-gray-400 text-sm">Latest market trends and predictions</p>
                <a
                  href="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm mt-2 inline-block"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">DeFi Explained</h3>
                <p className="text-gray-400 text-sm">Complete guide to decentralized finance</p>
                <a
                  href="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm mt-2 inline-block"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">Trading Psychology</h3>
                <p className="text-gray-400 text-sm">Master your emotions in trading</p>
                <a
                  href="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm mt-2 inline-block"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful traders and start learning today.
          </p>
          <Link
            to="/courses"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;