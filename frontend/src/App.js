import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Marketplace from './pages/Marketplace';
import HallOfFame from './pages/HallOfFame';
import Verify from './pages/Verify';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

const Page = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={loc} key={loc.pathname}>
        <Route path="/" element={<Page><Landing /></Page>} />
        <Route path="/marketplace" element={<Page><Marketplace /></Page>} />
        <Route path="/hall-of-fame" element={<Page><HallOfFame /></Page>} />
        <Route path="/verify" element={<Page><Verify /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/faq" element={<Page><FAQ /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="/terms" element={<Page><Terms /></Page>} />
        <Route path="/privacy" element={<Page><Privacy /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
