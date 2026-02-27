import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { Hadith } from '../types';
import { useTheme } from './ThemeContext';
import { useHadiths } from './HadithContext';

interface HadithCardProps {
  hadith: Hadith;
}

export const HadithCard: React.FC<HadithCardProps> = ({ hadith }) => {
  const { settings } = useTheme();
  const { userData, toggleBookmark, markAsRead } = useHadiths();
  
  const isBookmarked = userData.bookmarks.includes(hadith.TheNum);
  const isRead = userData.readHadiths.includes(hadith.TheNum);

  const copyToClipboard = () => {
    const text = `${hadith.Arabics}\n\n${hadith.Pashto}\n\n(صحيح البخاري، حديث: ${hadith.TheNum})`;
    navigator.clipboard.writeText(text);
  };

  const shareHadith = async () => {
    const text = `${hadith.Arabics}\n\n${hadith.Pashto}\n\n(صحيح البخاري، حديث: ${hadith.TheNum})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'صحيح البخاري',
          text: text,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    }
  };

  return (
    <motion.div
      initial={settings.animationsEnabled ? { opacity: 0, y: 20 } : {}}
      animate={settings.animationsEnabled ? { opacity: 1, y: 0 } : {}}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-4 shadow-sm relative overflow-hidden"
      onClick={() => markAsRead(hadith.TheNum)}
    >
      {isRead && (
        <div className="absolute top-2 left-2 text-emerald-500">
          <CheckCircle2 size={16} />
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
          حديث: {hadith.TheNum}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleBookmark(hadith.TheNum); }}
            className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); copyToClipboard(); }}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <Copy size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); shareHadith(); }}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-right">
          <p 
            className="arabic-text leading-relaxed text-right"
            style={{ 
              fontSize: `${settings.arabicFontSize}px`,
              lineHeight: settings.lineSpacing,
              fontFamily: settings.arabicFont
            }}
          >
            {hadith.Arabics}
          </p>
        </div>

        <div className="border-t border-[var(--border)] pt-4">
          <p 
            className="leading-relaxed text-right"
            style={{ 
              fontSize: `${settings.pashtoFontSize}px`,
              lineHeight: settings.lineSpacing,
              fontFamily: settings.pashtoFont
            }}
          >
            {hadith.Pashto}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
          {hadith.Book_pashto} • {hadith.Bab_pashto}
        </span>
      </div>
    </motion.div>
  );
};
