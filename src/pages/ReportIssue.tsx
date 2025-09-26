import React, { useState } from 'react';
import { Camera, MapPin, Upload, Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  images: File[];
}

export const ReportIssue: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    category: string;
    urgency: number;
    confidence: number;
  } | null>(null);

  const categories = [
    { value: 'pothole', label: 'Pothole', color: 'bg-orange-100 text-orange-800' },
    { value: 'garbage', label: 'Garbage/Waste', color: 'bg-brown-100 text-brown-800' },
    { value: 'streetlight', label: 'Street Light', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'water', label: 'Water/Drainage', color: 'bg-blue-100 text-blue-800' },
    { value: 'traffic', label: 'Traffic', color: 'bg-red-100 text-red-800' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
  ];

  // Mock AI analysis
  const triggerAIAnalysis = (description: string) => {
    if (description.length > 10) {
      setTimeout(() => {
        const mockAnalysis = {
          category: 'pothole',
          urgency: Math.floor(Math.random() * 40) + 60, // 60-100
          confidence: Math.floor(Math.random() * 20) + 80 // 80-100
        };
        setAiAnalysis(mockAnalysis);
        setFormData(prev => ({ ...prev, category: mockAnalysis.category }));
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          setFormData(prev => ({
            ...prev,
            location: '28.6139, 77.2090' // Default to Delhi coordinates
          }));
        }
      );
    }
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Issue Reported Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your report has been received and is being processed by our AI system. 
            You'll receive updates on the progress.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800 font-medium mb-2">Issue ID: #ISS-2025-001</p>
            {aiAnalysis && (
              <div className="text-sm text-blue-700">
                <p>AI Urgency Score: {aiAnalysis.urgency}%</p>
                <p>Estimated Resolution: 3-5 days</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: '',
                  description: '',
                  category: '',
                  location: formData.location,
                  images: []
                });
                setAiAnalysis(null);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Report Another Issue
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Report a Civic Issue</h1>
            <p className="text-blue-100">Help make your city better by reporting issues that need attention</p>
          </div>

          {/* AI Analysis Panel */}
          {aiAnalysis && (
            <div className="bg-blue-50 border-b border-blue-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">AI Analysis Complete</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">Category</p>
                  <p className="font-medium text-blue-900 capitalize">{aiAnalysis.category}</p>
                </div>
                <div>
                  <p className="text-blue-700">Urgency Score</p>
                  <p className="font-medium text-blue-900">{aiAnalysis.urgency}%</p>
                </div>
                <div>
                  <p className="text-blue-700">Confidence</p>
                  <p className="font-medium text-blue-900">{aiAnalysis.confidence}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the issue"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, description: e.target.value }));
                  triggerAIAnalysis(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Provide detailed information about the issue..."
              />
              {formData.description.length > 10 && !aiAnalysis && (
                <div className="mt-2 flex items-center space-x-2 text-blue-600 text-sm">
                  <Brain className="h-4 w-4 animate-spin" />
                  <span>AI analyzing your description...</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map(category => (
                  <label key={category.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-colors ${
                      formData.category === category.value
                        ? `${category.color} border-current`
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}>
                      {category.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location or coordinates"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Get current location"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos/Videos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload photos or videos</p>
                  <p className="text-sm text-gray-500">PNG, JPG, MP4 up to 10MB each</p>
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.images.length} file(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((file, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing Report...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Our AI automatically categorizes issues, calculates urgency scores, and routes them to the appropriate department for faster resolution.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Guaranteed Response</h3>
            </div>
            <p className="text-gray-600 text-sm">
              All reports come with SLA tracking and automatic escalation to ensure your issue gets the attention it deserves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};