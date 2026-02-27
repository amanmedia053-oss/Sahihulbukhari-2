import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, Hash } from 'lucide-react';
import { useHadiths } from './HadithContext';
import { HadithCard } from './HadithCard';
import { Hadith } from '../types';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onHadithClick: (hadith: Hadith) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose, onHadithClick }) => {
  const { hadiths } = useHadiths();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'number'>('text');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    if (searchType === 'number') {
      return hadiths.filter(h => h.TheNum.includes(query));
    }
    
    const q = query.toLowerCase();
    return hadiths.filter(h => 
      h.Pashto.toLowerCase().includes(q) || 
      h.Arabics.includes(q) ||
      h.Book_pashto.toLowerCase().includes(q) ||
      h.Bab_pashto.toLowerCase().includes(q)
    );
  }, [query, hadiths, searchType]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[var(--background)] safe-pt">
        <div className="p-4 border-b border-[var(--border)] bg-[var(--card)] flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
          
          <div className="flex-1 relative">
            <input
              autoFocus
              type={searchType === 'number' ? 'number' : 'text'}
              placeholder={searchType === 'number' ? 'د حديث شمېره وليکئ...' : 'لټون وکړئ...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-100 border-none rounded-2xl py-3 pr-12 pl-4 focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {searchType === 'number' ? <Hash size={20} /> : <SearchIcon size={20} />}
            </div>
          </div>
        </div>

        <div className="flex gap-2 p-4 bg-[var(--card)] border-b border-[var(--border)]">
          <button
            onClick={() => setSearchType('text')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              searchType === 'text' ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            متن لټون
          </button>
          <button
            onClick={() => setSearchType('number')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              searchType === 'number' ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            د حديث شمېره
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          {query.trim() === '' ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <SearchIcon size={64} strokeWidth={1} />
              <p>دلته خپل لټون وليکئ</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 px-2">{results.length} نتيجې وموندل شوې</p>
              {results.map(hadith => (
                <div key={hadith.TheNum} onClick={() => { onHadithClick(hadith); onClose(); }}>
                  <HadithCard hadith={hadith} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <X size={64} strokeWidth={1} />
              <p>هيڅ نتيجه ونه موندل شوه</p>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
