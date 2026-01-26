import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AnalyzerPage from './pages/analyzer/AnalyzerPage';
import ContactPage from './pages/contact/ContactPage';
import { GarageProvider } from './context/GarageContext';

function App() {
  return (
    <Router>
      <GarageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </GarageProvider>
    </Router>
  );
}

export default App;
