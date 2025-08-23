import React, { useState } from 'react';
import { Star, Clock, Users, Play, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  image: string;
  level: string;
  instructor: string;
  lessons: number;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Bitcoin Basics & Trading Fundamentals',
    description: 'Learn the complete fundamentals of Bitcoin and cryptocurrency trading from scratch.',
    price: 2999,
    originalPrice: 5999,
    rating: 4.8,
    students: 2543,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'Beginner',
    instructor: 'Krishna Guru',
    lessons: 45
  },
  {
    id: 2,
    title: 'Advanced Technical Analysis',
    description: 'Master advanced chart patterns, indicators, and technical analysis strategies.',
    price: 4999,
    originalPrice: 9999,
    rating: 4.9,
    students: 1876,
    duration: '12 weeks',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'Advanced',
    instructor: 'Krishna Guru',
    lessons: 72
  },
  {
    id: 3,
    title: 'DeFi & Yield Farming Strategies',
    description: 'Explore decentralized finance protocols and maximize your yield farming returns.',
    price: 3999,
    originalPrice: 7999,
    rating: 4.7,
    students: 1234,
    duration: '6 weeks',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'Intermediate',
    instructor: 'Krishna Guru',
    lessons: 38
  },
  {
    id: 4,
    title: 'Crypto Options & Derivatives',
    description: 'Learn advanced derivatives trading strategies for professional trading.',
    price: 5999,
    originalPrice: 11999,
    rating: 4.6,
    students: 987,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'Expert',
    instructor: 'Krishna Guru',
    lessons: 56
  },
  {
    id: 5,
    title: 'Algorithmic Trading with Python',
    description: 'Build automated trading systems using Python and machine learning.',
    price: 6999,
    originalPrice: 13999,
    rating: 4.8,
    students: 756,
    duration: '14 weeks',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'Expert',
    instructor: 'Krishna Guru',
    lessons: 84
  },
  {
    id: 6,
    title: 'NFT Trading & Investment',
    description: 'Discover the world of NFTs and learn profitable investment strategies.',
    price: 3499,
    originalPrice: 6999,
    rating: 4.5,
    students: 1543,
    duration: '5 weeks',
    image: 'https://images.pexels.com/photos/8370799/pexels-photo-8370799.jpeg?auto=compress&cs=tinysrgb&w=600',
    level: 'Intermediate',
    instructor: 'Krishna Guru',
    lessons: 32
  }
];

const Courses: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const filteredCourses = selectedFilter === 'All' 
    ? courses 
    : courses.filter(course => course.level === selectedFilter);

  const handleEnrollClick = (courseId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    // This would integrate with Stripe for actual payments
    alert('Payment gateway integration coming soon! For now, this is a demo.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crypto Trading Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master cryptocurrency trading with our comprehensive courses designed by industry experts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating) ? 'fill-current' : ''
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {course.rating} ({course.students})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Enroll Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Gateway Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Secure Payment Gateway
          </h3>
          <p className="text-blue-800">
            We use industry-standard encryption to ensure your payments are secure. 
            Multiple payment options available including UPI, Credit/Debit Cards, and Net Banking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;