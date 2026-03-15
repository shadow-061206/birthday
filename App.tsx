
import React, { useState, useEffect } from 'react';
import RosePetals from './components/RosePetals';
import Intro from './components/Intro';
import CardSelection from './components/CardSelection';
import PuzzlePage from './components/PuzzlePage';
import GalleryPage from './components/GalleryPage';
import WishesPage from './components/WishesPage';
import FinalWish from './components/FinalWish';

enum Page {
  INTRO,
  CARDS,
  PUZZLE,
  GALLERY,
  WISHES,
  FINAL
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.INTRO);
  const [visited, setVisited] = useState({
    brain: false,
    cute: false,
    year: false
  });

  // Check if all cards have been visited
  useEffect(() => {
    if (visited.brain && visited.cute && visited.year && currentPage === Page.CARDS) {
      const timer = setTimeout(() => {
        setCurrentPage(Page.FINAL);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visited, currentPage]);

  const handleVisit = (type: 'brain' | 'cute' | 'year') => {
    setVisited(prev => ({ ...prev, [type]: true }));
    if (type === 'brain') setCurrentPage(Page.PUZZLE);
    if (type === 'cute') setCurrentPage(Page.GALLERY);
    if (type === 'year') setCurrentPage(Page.WISHES);
  };

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden bg-rose-50 selection:bg-rose-200">
      <RosePetals />
      
      <main className="relative z-10 w-full min-h-screen">
        {currentPage === Page.INTRO && (
          <Intro onStart={() => setCurrentPage(Page.CARDS)} />
        )}

        {currentPage === Page.CARDS && (
          <CardSelection 
            visited={visited}
            onSelect={handleVisit}
          />
        )}

        {currentPage === Page.PUZZLE && (
          <PuzzlePage onBack={() => setCurrentPage(Page.CARDS)} />
        )}

        {currentPage === Page.GALLERY && (
          <GalleryPage onBack={() => setCurrentPage(Page.CARDS)} />
        )}

        {currentPage === Page.WISHES && (
          <WishesPage onBack={() => setCurrentPage(Page.CARDS)} />
        )}

        {currentPage === Page.FINAL && (
          <FinalWish />
        )}
      </main>
    </div>
  );
}
