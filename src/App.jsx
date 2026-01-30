
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import VersusMode from './pages/versus-mode/VersusMode';
import Location from './pages/location/Location';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/versus-mode" element={<VersusMode />} />
          <Route path="/location" element={<Location />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
