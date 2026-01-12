
import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import { MONTHS } from './constants.tsx';

import { Toaster } from 'sonner';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stats from './components/Stats';

// Separate Home component to keep App clean
const Home: React.FC<{
  currentMonthIndex: number;
  setCurrentMonthIndex: (idx: number) => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}> = ({ currentMonthIndex, setCurrentMonthIndex, toggleDarkMode, darkMode }) => (
  <div className="min-h-screen flex flex-col selection:bg-accent/30">
    <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <main className="flex-grow">
      <Hero 
        month={MONTHS[currentMonthIndex]} 
        onMonthChange={(idx) => setCurrentMonthIndex(idx)}
      />
      <FeaturesSection />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home 
            currentMonthIndex={currentMonthIndex}
            setCurrentMonthIndex={setCurrentMonthIndex}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        } />
        <Route path="/descargas" element={<Stats />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  );
};

export default App;
