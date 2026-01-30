import React from 'react';
import { BrowserRouter as Router, Routes, Route, UNSAFE_WithComponentProps } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Compiler from './pages/Compiler';
import About from './pages/About';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from './components/Footer';
import Adsense from './components/Adsense';
/**
 * Main App Component
 * Sets up routing and renders the application
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        {/* SAFE GLOBAL AD (below content, above footer) */}
        <div style={{ maxWidth: "1100px", margin: "40px auto" }}>
          <Adsense slot="8351730639" />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
