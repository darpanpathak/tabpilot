import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
}

const DEFAULT_QUOTES: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" }
];

const isExtension = typeof chrome !== 'undefined' && chrome.storage;

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>(DEFAULT_QUOTES);
  const [currentQuote, setCurrentQuote] = useState<Quote>(DEFAULT_QUOTES[0]);

  useEffect(() => {
    if (isExtension) {
      // Load saved quotes from storage
      chrome.storage.sync.get(['quotes', 'currentQuote'], (result) => {
        if (result.quotes) {
          setQuotes(result.quotes);
        }
        if (result.currentQuote) {
          setCurrentQuote(result.currentQuote);
        }
      });
    }

    // Refresh quote every hour
    const interval = setInterval(refreshQuote, 3600000);
    return () => clearInterval(interval);
  }, []);

  const refreshQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    setCurrentQuote(newQuote);
    if (isExtension) {
      chrome.storage.sync.set({ currentQuote: newQuote });
    }
  };

  return {
    currentQuote,
    refreshQuote,
    addQuote: (quote: Quote) => {
      const newQuotes = [...quotes, quote];
      setQuotes(newQuotes);
      if (isExtension) {
        chrome.storage.sync.set({ quotes: newQuotes });
      }
    }
  };
}