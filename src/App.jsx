
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import VersusMode from './pages/versus-mode/VersusMode';
import './Animations.css';
import Location from './pages/location/Location';
import GaragePage from './pages/garage/GaragePage';
import GuessGame from './pages/guess-game/GuessGame';
import BattleGame from './pages/battle-game/BattleGame';

import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiesPolicy from './pages/legal/CookiesPolicy';
import TermsOfSale from './pages/legal/TermsOfSale';
import GuidePage from './pages/guide/GuidePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/versus-mode" element={<VersusMode />} />
          <Route path="/location" element={<Location />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/minigames/guess" element={<GuessGame />} />
          <Route path="/minigames/battle" element={<BattleGame />} />
          
          {/* Legal & Help Routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/terms" element={<TermsOfSale />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
