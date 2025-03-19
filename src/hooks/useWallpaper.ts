import { useState, useEffect } from 'react';

const DEFAULT_WALLPAPERS = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff'
];

const isExtension = typeof chrome !== 'undefined' && chrome.storage;

export function useWallpaper() {
  const [wallpapers, setWallpapers] = useState(DEFAULT_WALLPAPERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isExtension) {
      // Load saved wallpapers from storage
      chrome.storage.sync.get(['wallpapers', 'currentIndex'], (result) => {
        if (result.wallpapers) {
          setWallpapers(result.wallpapers);
        }
        if (typeof result.currentIndex === 'number') {
          setCurrentIndex(result.currentIndex);
        }
      });
    }
  }, []);

  const nextWallpaper = () => {
    const nextIndex = (currentIndex + 1) % wallpapers.length;
    setCurrentIndex(nextIndex);
    if (isExtension) {
      chrome.storage.sync.set({ currentIndex: nextIndex });
    }
  };

  return {
    currentWallpaper: wallpapers[currentIndex],
    nextWallpaper,
    addWallpaper: (url: string) => {
      const newWallpapers = [...wallpapers, url];
      setWallpapers(newWallpapers);
      if (isExtension) {
        chrome.storage.sync.set({ wallpapers: newWallpapers });
      }
    }
  };
}