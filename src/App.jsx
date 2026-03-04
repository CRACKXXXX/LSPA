import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import VersusMode from './pages/versus-mode/VersusMode';
import './styles/Animations.css'; // Updated path
import Location from './pages/location/Location';
import GaragePage from './pages/garage/GaragePage';
import { GarageProvider } from './context/GarageContext';
import { CrewProvider } from './context/CrewContext';
import CrewPage from './pages/crews/CrewPage';
import CrewAdmin from './pages/crews/CrewAdmin';
import CrewExplorer from './pages/crews/CrewExplorer';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { GamificationProvider } from './context/GamificationContext';
import AuthPage from './pages/auth/AuthPage';
import ProfilePage from './pages/profile/ProfilePage';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Community from './pages/community/Community';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Analytics from './pages/analytics/Analytics';

import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiesPolicy from './pages/legal/CookiesPolicy';
import TermsOfSale from './pages/legal/TermsOfSale';
import GuideFAQ from './pages/legal/GuideFAQ';
import AdminPanel from './pages/admin/AdminPanel';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import ForoNews from './pages/foro-news/ForoNews';
import RssPage from './pages/rss/RssPage';

// UI Pack
import AppLoader from './components/app-loader/AppLoader';
import BackgroundSparks from './components/background-sparks/BackgroundSparks';
import ScrollTopBtn from './components/scroll-top-btn/ScrollTopBtn';

// Games (Refactored)
import GuessGame from './pages/games/guess/GuessGame';
import BattleGame from './pages/games/battle/BattleGame';
import HigherLower from './pages/games/higher-lower/HigherLower';
import { NoticiasProvider } from './context/NoticiasContext';

function AppContent({ appReady }) {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className={`app-wrapper ${appReady ? 'fade-in-content' : ''}`} style={{opacity: appReady ? 1 : 0}}>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ... other routes ... */}
          <Route path="/home" element={<Home />} />
          <Route path="/versus-mode" element={<VersusMode />} />
          <Route path="/location" element={<Location />} />
          <Route path="/garage" element={<ProtectedRoute><GaragePage /></ProtectedRoute>} />
          <Route path="/minigames/guess" element={<GuessGame />} />
          <Route path="/minigames/battle" element={<BattleGame />} />
          <Route path="/minigames/higher-lower" element={<HigherLower />} />
          <Route path="/crews" element={<ProtectedRoute><CrewPage /></ProtectedRoute>} /> 
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/foro" element={<ForoNews />} />
          <Route path="/rss" element={<RssPage />} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/terms-of-sale" element={<TermsOfSale />} />
          <Route path="/guide-faq" element={<GuideFAQ />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/crew-admin" element={<ProtectedRoute><CrewAdmin /></ProtectedRoute>} />
          <Route path="/crew-explorer" element={<ProtectedRoute><CrewExplorer /></ProtectedRoute>} />
        </Routes>
      </div>
      {/* El home tiene su propio footer sticky, no necesita el global */}
      {!isHome && <Footer />}
    </div>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider> 
        <GarageProvider>
          <GamificationProvider>
            <CrewProvider>
              <AppLoader onComplete={() => setAppReady(true)} />
              <BackgroundSparks />
              <NoticiasProvider>
              <Router>
                <ScrollToTop />
                <ScrollTopBtn />
                <AppContent appReady={appReady} />
              </Router>
              </NoticiasProvider>
            </CrewProvider>
          </GamificationProvider>
        </GarageProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
