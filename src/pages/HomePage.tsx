import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Award, Zap, Shield, Globe, ArrowRight, Play } from 'lucide-react';

export const HomePage: React.FC = () => {
  const stats = [
    { label: 'Issues Reported', value: '2,847', icon: MapPin },
    { label: 'Active Citizens', value: '1,234', icon: Users },
    { label: 'Issues Resolved', value: '2,156', icon: Award },
    { label: 'Response Time', value: '4.2 hrs', icon: Zap }
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Smart Reporting',
      description: 'AI-powered issue detection with automatic geo-tagging and categorization'
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Upvote issues, earn points, and climb the leaderboard while making your city better'
    },
    {
      icon: Shield,
      title: 'Accountability',
      description: 'Automated escalation ensures no issue goes unresolved with transparent SLA tracking'
    },
    {
      icon: Globe,
      title: 'Multi-Channel Access',
      description: 'Report via web, mobile app, WhatsApp, or SMS - accessible to everyone'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Civic Connect</h1>
                <p className="text-sm text-gray-600">Making Cities Better Together</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                View Dashboard
              </Link>
              <Link
                to="/report"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Report Issue
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your City with
              <span className="text-blue-600"> AI-Powered</span> Civic Engagement
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Report civic issues instantly, get them resolved faster with AI-driven triage, 
              and build a better community through gamified participation and transparent accountability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/report"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Report Your First Issue</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/dashboard"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>See Live Dashboard</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3">
                      <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Innovative Features for Smart Cities
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI, gamification, and transparency 
              to revolutionize how citizens and authorities collaborate.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How Smart Civic Connect Works
            </h3>
            <p className="text-lg text-gray-600">
              Simple, fast, and effective - from report to resolution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Report & Auto-Tag</h4>
              <p className="text-gray-600">
                Take a photo, describe the issue. Our AI automatically detects the problem type, 
                urgency level, and geo-location.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Smart Routing</h4>
              <p className="text-gray-600">
                Issues are automatically assigned to the right department with SLA tracking 
                and escalation mechanisms.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Track & Reward</h4>
              <p className="text-gray-600">
                Get real-time updates, earn points for contributions, and see proof of resolution 
                from authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Make Your City Better?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of citizens already making a difference in their communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/report"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Reporting Issues
            </Link>
            <Link
              to="/dashboard"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">Smart Civic Connect</h4>
              <p className="text-sm text-gray-400">Making Cities Better Together</p>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Smart Civic Connect. Built for Smart India Hackathon 2025.</p>
            <p className="mt-2">Empowering citizens and authorities to build smarter, cleaner cities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};