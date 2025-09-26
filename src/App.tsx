import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { ReportIssue } from './pages/ReportIssue';
import { Leaderboard } from './pages/Leaderboard';
import { AdminPanel } from './pages/AdminPanel';
import { Profile } from './pages/Profile';

function App() {
  // For demo purposes, we'll toggle between citizen and authority views
  const [userRole, setUserRole] = useState<'citizen' | 'authority'>('citizen');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/*" 
            element={
              <>
                <Navbar userRole={userRole} notificationCount={3} />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/report" element={<ReportIssue />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                
                {/* Role Toggle (for demo purposes) */}
                <div className="fixed bottom-6 right-6 z-50">
                  <button
                    onClick={() => setUserRole(userRole === 'citizen' ? 'authority' : 'citizen')}
                    className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-800 transition-colors"
                  >
                    Switch to {userRole === 'citizen' ? 'Authority' : 'Citizen'} View
                  </button>
                </div>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;