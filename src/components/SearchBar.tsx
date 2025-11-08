'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/data';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff } from 'lucide-react';
import { getFirstValidImage } from '@/utils/imageUtils';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start(): void;
  stop(): void;
  abort(): void;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize search history from localStorage
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    }
    return [];
  });

  // Save search history to localStorage
  const saveSearchHistory = (newHistory: string[]) => {
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      const allProducts = await getAllProducts();
      const searchResults = allProducts
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(query.toLowerCase()) ||
          product.brand?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8); // Increased limit for better suggestions

      setResults(searchResults);
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      // Add to search history
      const newHistory = [query.trim(), ...searchHistory.filter(h => h !== query.trim())].slice(0, 10);
      saveSearchHistory(newHistory);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsOpen(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const clearSearchHistory = () => {
    saveSearchHistory([]);
  };

  const removeHistoryItem = (item: string) => {
    const newHistory = searchHistory.filter(h => h !== item);
    saveSearchHistory(newHistory);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            className="w-full px-4 py-2 pl-10 pr-20 text-sm text-slate-100 bg-slate-800 border border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-slate-400"
            placeholder="Search products, brands, and categories..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            <Button
              type="button"
              onClick={isListening ? stopVoiceSearch : startVoiceSearch}
              variant="ghost"
              className={`p-1 rounded-full transition-colors ${
                isListening ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-slate-300'
              }`}
              title={isListening ? 'Stop voice search' : 'Start voice search'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-3 py-1 text-sm font-medium"
            >
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {/* Search History */}
          {!query.trim() && searchHistory.length > 0 && (
            <div className="border-b border-slate-700">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-medium text-slate-300">Recent Searches</span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearSearchHistory}
                  className="text-xs text-slate-400 hover:text-slate-300"
                >
                  Clear All
                </Button>
              </div>
              {searchHistory.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setQuery(item);
                    setIsOpen(false);
                    router.push(`/search?q=${encodeURIComponent(item)}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setQuery(item);
                      setIsOpen(false);
                      router.push(`/search?q=${encodeURIComponent(item)}`);
                    }
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 hover:bg-slate-700 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-slate-100">{item}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHistoryItem(item);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-300 p-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Search Suggestions */}
          {query.trim().length >= 2 && results.length > 0 && (
            <>
              <div className="px-4 py-2 border-b border-slate-700">
                <span className="text-sm font-medium text-slate-300">Suggestions</span>
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center p-4 hover:bg-slate-700 transition-colors"
                >
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={getFirstValidImage(product.images)}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-slate-100">{product.name}</h4>
                    <p className="text-sm text-slate-400 truncate">{product.category}</p>
                    {product.brand && (
                      <p className="text-xs text-slate-500">by {product.brand}</p>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-slate-100">₵{product.price.toFixed(2)}</p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <p className="text-xs text-slate-400 line-through">₵{product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="block px-4 py-3 text-sm text-teal-400 hover:bg-slate-700 border-t border-slate-700"
              >
                View all results for &quot;{query}&quot;
              </Link>
            </>
          )}

          {/* Popular Searches */}
          {!query.trim() && searchHistory.length === 0 && (
            <div>
              <div className="px-4 py-2 border-b border-slate-700">
                <span className="text-sm font-medium text-slate-300">Popular Searches</span>
              </div>
              {['laptop', 'smartphone', 'headphones', 'watch', 'camera'].map((term) => (
                <Button
                  key={term}
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setQuery(term);
                    setIsOpen(false);
                    router.push(`/search?q=${encodeURIComponent(term)}`);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm text-slate-100">{term}</span>
                </Button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query.trim().length >= 2 && results.length === 0 && (
              <div className="p-4 text-sm text-slate-400 text-center">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};
