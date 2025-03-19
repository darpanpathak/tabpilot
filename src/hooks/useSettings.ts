import { useState, useEffect } from 'react';

interface Settings {
  timeFormat: '12h' | '24h';
  fontFamily: string;
  clockOpacity: number;
  wallpaperRotation: boolean;
  wallpaperInterval: number;
}

const DEFAULT_SETTINGS: Settings = {
  timeFormat: '24h',
  fontFamily: 'system-ui',
  clockOpacity: 0.9,
  wallpaperRotation: false,
  wallpaperInterval: 3600
};

const isExtension = typeof chrome !== 'undefined' && chrome.storage;

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (isExtension) {
      // Load settings from storage
      chrome.storage.sync.get(['settings'], (result) => {
        if (result.settings) {
          setSettings(result.settings);
        }
      });
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    if (isExtension) {
      chrome.storage.sync.set({ settings: updatedSettings });
    }
  };

  return { settings, updateSettings };
}