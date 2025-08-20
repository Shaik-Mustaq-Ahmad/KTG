import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, ExternalLink } from 'lucide-react';

interface LiveSession {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'live' | 'ended';
  zoomLink: string;
  instructor: string;
}

const liveSessions: LiveSession[] = [
  {
    id: 1,
    title: 'Bitcoin Market Analysis',
    description: 'Daily market analysis covering Bitcoin price movements, key support/resistance levels, and trading opportunities.',
    date: '2025-01-27',
    time: '09:00 AM',
    duration: '1 hour',
    participants: 1234,
    status: 'live',
    zoomLink: 'https://zoom.us/j/123456789',
    instructor: 'Krishna Guru'
  },
  {
    id: 2,
    title: 'Altcoin Portfolio Review',
    description: 'Weekly altcoin portfolio review session covering top performing altcoins and investment strategies.',
    date: '2025-01-27',
    time: '02:00 PM',
    duration: '1.5 hours',
    participants: 876,
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/987654321',
    instructor: 'Krishna Guru'
  },
  {
    id: 3,
    title: 'DeFi Trading Masterclass',
    description: 'Deep dive into DeFi protocols, yield farming strategies, and risk management techniques.',
    date: '2025-01-27',
    time: '07:00 PM',
    duration: '2 hours',
    participants: 654,
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/456789123',
    instructor: 'Krishna Guru'
  },
  {
    id: 4,
    title: 'Technical Analysis Workshop',
    description: 'Advanced chart pattern recognition and trading indicator analysis for cryptocurrency markets.',
    date: '2025-01-26',
    time: '09:00 AM',
    duration: '1 hour',
    participants: 1987,
    status: 'ended',
    zoomLink: 'https://zoom.us/j/789123456',
    instructor: 'Krishna Guru'
  }
];

const Live: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-green-500 text-white';
      case 'ended':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return '🔴 LIVE';
      case 'upcoming':
        return '⏰ Upcoming';
      case 'ended':
        return '✅ Ended';
      default:
        return status;
    }
  };

  const handleJoinSession = (session: LiveSession) => {
    if (session.status === 'live' || session.status === 'upcoming') {
      window.open(session.zoomLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Video className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">Live Trading Sessions</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our daily live trading sessions and learn from real-time market analysis and trading strategies.
          </p>
        </div>

        {/* Live Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {liveSessions.filter(s => s.status === 'live').length}
            </div>
            <div className="text-gray-600">Live Now</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {liveSessions.filter(s => s.status === 'upcoming').length}
            </div>
            <div className="text-gray-600">Upcoming Today</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {liveSessions.reduce((total, session) => total + session.participants, 0)}
            </div>
            <div className="text-gray-600">Total Participants</div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {liveSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                    {getStatusText(session.status)}
                  </span>
                  {session.status === 'live' && (
                    <div className="flex items-center space-x-1 text-red-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">LIVE</span>
                    </div>
                  )}
                </div>

                {/* Session Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {session.description}
                </p>

                {/* Session Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{session.participants} joined</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">KG</span>
                    </div>
                    <span className="text-sm text-gray-700">Instructor: {session.instructor}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleJoinSession(session)}
                    disabled={session.status === 'ended'}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200 ${
                      session.status === 'live'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : session.status === 'upcoming'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>
                      {session.status === 'live' ? 'Join Live' : 
                       session.status === 'upcoming' ? 'Join Session' : 'Session Ended'}
                    </span>
                  </button>
                  
                  {session.status !== 'ended' && (
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Notice */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Daily Live Sessions</h3>
          <p className="text-lg mb-6">
            Join us every day for live market analysis, trading signals, and Q&A sessions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">9:00 AM IST</div>
              <div className="text-sm opacity-90">Morning Analysis</div>
            </div>
            <div>
              <div className="text-xl font-bold">2:00 PM IST</div>
              <div className="text-sm opacity-90">Afternoon Review</div>
            </div>
            <div>
              <div className="text-xl font-bold">7:00 PM IST</div>
              <div className="text-sm opacity-90">Evening Strategy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedSession.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedSession.description}
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{selectedSession.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{selectedSession.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{selectedSession.duration}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleJoinSession(selectedSession)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Join Session
              </button>
              <button
                onClick={() => setSelectedSession(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Live;