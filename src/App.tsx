import React, { useState, useEffect } from 'react';
import { Clock, Quote, Settings, Image } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useWallpaper } from './hooks/useWallpaper';
import { useQuotes } from './hooks/useQuotes';
import { useSettings } from './hooks/useSettings';

function App() {
  const { user, loading, signIn, signOut } = useAuth();
  const { currentWallpaper, nextWallpaper } = useWallpaper();
  const { currentQuote, refreshQuote } = useQuotes();
  const { settings, updateSettings } = useSettings();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return settings.timeFormat === '24h' 
      ? date.toLocaleTimeString('en-US', { hour12: false })
      : date.toLocaleTimeString('en-US', { hour12: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url(${currentWallpaper})`,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Header with auth and settings */}
      <div className="absolute top-0 right-0 p-4 flex gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <img 
                src={user.user_metadata.avatar_url} 
                alt={user.user_metadata.full_name} 
                className="w-6 h-6 rounded-full"
              />
              <span className="text-white">{user.user_metadata.full_name}</span>
            </div>
            <button 
              onClick={() => signOut()} 
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Sign Out
            </button>
            <button 
              onClick={() => {/* Open Settings */}} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
            >
              <Settings className="w-6 h-6 text-white" />
            </button>
          </>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2"
          >
            Sign in
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        {/* Clock */}
        <div 
          className="text-8xl font-bold mb-8"
          style={{ 
            fontFamily: settings.fontFamily,
            opacity: settings.clockOpacity 
          }}
        >
          {formatTime(time)}
        </div>

        {/* Quote */}
        <div className="max-w-2xl text-center mb-8 p-6 bg-black/20 backdrop-blur-sm rounded-xl">
          <p className="text-xl italic mb-2">{currentQuote.text}</p>
          <p className="text-sm opacity-75">— {currentQuote.author}</p>
        </div>

        {/* Wallpaper controls */}
        {user && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={nextWallpaper}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
            >
              <Image className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App