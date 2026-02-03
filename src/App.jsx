
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import VersusMode from './pages/versus-mode/VersusMode';
import './Animations.css';
import Location from './pages/location/Location';
import GaragePage from './pages/garage/GaragePage';
import { GarageProvider } from './context/GarageContext';
import GuessGame from './pages/guess-game/GuessGame';
import BattleGame from './pages/battle-game/BattleGame';
import HigherLower from './pages/minigames/HigherLower';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';
import AuthPage from './pages/auth/AuthPage';
import ProfilePage from './pages/profile/ProfilePage';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Community from './pages/community/Community';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Analytics from './pages/analytics/Analytics';

import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiesPolicy from './pages/legal/CookiesPolicy';
import TermsOfSale from './pages/legal/TermsOfSale';
import GuideFAQ from './pages/legal/GuideFAQ';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <GarageProvider>
        <GamificationProvider>
          <Router>
            <ScrollToTop />
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/versus-mode" element={<VersusMode />} />
              <Route path="/location" element={<Location />} />
              <Route path="/garage" element={<ProtectedRoute><GaragePage /></ProtectedRoute>} />
              <Route path="/minigames/guess" element={<GuessGame />} />
              <Route path="/minigames/battle" element={<BattleGame />} />
              <Route path="/minigames/higher-lower" element={<HigherLower />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/community" element={<Community />} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/terms-of-sale" element={<TermsOfSale />} />
              <Route path="/guide-faq" element={<GuideFAQ />} />
            </Routes>
          </div>
          <Footer />
          </Router>
        </GamificationProvider>
      </GarageProvider>
    </AuthProvider>
  );
}

export default App;
