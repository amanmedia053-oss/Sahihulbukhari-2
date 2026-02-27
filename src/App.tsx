import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Bookmark, History, ArrowRight, Star, ChevronLeft, ChevronRight, Book, Layers } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { HadithProvider, useHadiths } from './components/HadithContext';
import { HadithCard } from './components/HadithCard';
import { BottomNav } from './components/BottomNav';
import { SettingsDialog } from './components/SettingsDialog';
import { SearchDialog } from './components/SearchDialog';
import { ExitDialog } from './components/ExitDialog';
import { Onboarding } from './components/Onboarding';
import { SplashScreen } from './components/SplashScreen';
import { AboutUsDialog } from './components/AboutUsDialog';
import { Hadith } from './types';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedBab, setSelectedBab] = useState<string | null>(null);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  
  const { hadiths, userData, loading, markAsRead } = useHadiths();
  const { settings, updateSettings } = useTheme();

  // Categorization Data
  const books = useMemo(() => {
    const map = new Map<string, { pashto: string, arabic: string }>();
    hadiths.forEach(h => {
      if (!map.has(h.Book)) {
        map.set(h.Book, { pashto: h.Book_pashto, arabic: h.Book });
      }
    });
    return Array.from(map.values());
  }, [hadiths]);

  const babs = useMemo(() => {
    if (!selectedBook) return [];
    const map = new Map<string, { pashto: string, arabic: string }>();
    hadiths.filter(h => h.Book === selectedBook).forEach(h => {
      if (!map.has(h.Bab)) {
        map.set(h.Bab, { pashto: h.Bab_pashto, arabic: h.Bab });
      }
    });
    return Array.from(map.values());
  }, [hadiths, selectedBook]);

  const filteredHadiths = useMemo(() => {
    if (!selectedBook || !selectedBab) return [];
    return hadiths.filter(h => h.Book === selectedBook && h.Bab === selectedBab);
  }, [hadiths, selectedBook, selectedBab]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    
    // Configure Status Bar
    const setupStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#10b981' });
      } catch (e) {
        console.warn('StatusBar not available');
      }
    };
    setupStatusBar();

    return () => clearTimeout(timer);
  }, []);

  // Capacitor Back Button Handling
  useEffect(() => {
    const backHandler = CapApp.addListener('backButton', () => {
      if (selectedHadith) {
        setSelectedHadith(null);
      } else if (selectedBab) {
        setSelectedBab(null);
      } else if (selectedBook) {
        setSelectedBook(null);
      } else if (isAboutUsOpen) {
        setIsAboutUsOpen(false);
      } else if (isSettingsOpen) {
        setIsSettingsOpen(false);
      } else if (isSearchOpen) {
        setIsSearchOpen(false);
      } else if (activeTab !== 'home') {
        setActiveTab('home');
      } else {
        setIsExitOpen(true);
      }
    });

    return () => {
      backHandler.then(h => h.remove());
    };
  }, [activeTab, selectedBook, selectedBab, selectedHadith, isAboutUsOpen, isSettingsOpen, isSearchOpen]);

  if (showSplash) return <SplashScreen />;
  if (!settings.onboardingComplete) return <Onboarding onComplete={() => updateSettings({ onboardingComplete: true })} />;

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--background)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const renderTab = () => {
    if (selectedHadith) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 bg-[var(--background)] overflow-y-auto p-6 pb-24 safe-pt"
        >
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setSelectedHadith(null)} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={24} />
            </button>
            <h2 className="text-xl font-bold">حديث شريف</h2>
          </div>
          <HadithCard hadith={selectedHadith} />
        </motion.div>
      );
    }

    switch (activeTab) {
      case 'home':
        if (selectedBab) {
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 safe-pt">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setSelectedBab(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight size={24} />
                </button>
                <h2 className="text-xl font-bold">{selectedBab}</h2>
              </div>
              <div className="space-y-4">
                {filteredHadiths.map(h => (
                  <div key={h.TheNum} onClick={() => { setSelectedHadith(h); markAsRead(h.TheNum); }}>
                    <HadithCard hadith={h} />
                  </div>
                ))}
              </div>
            </motion.div>
          );
        }
        if (selectedBook) {
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 safe-pt">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setSelectedBook(null)} className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight size={24} />
                </button>
                <h2 className="text-xl font-bold">{selectedBook}</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {babs.map(bab => (
                  <button
                    key={bab.arabic}
                    onClick={() => setSelectedBab(bab.arabic)}
                    className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-right flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <Layers size={20} />
                      </div>
                      <span className="font-bold">{bab.pashto}</span>
                    </div>
                    <ChevronLeft size={20} className="text-gray-300 group-hover:text-[var(--primary)]" />
                  </button>
                ))}
              </div>
            </motion.div>
          );
        }
        const lastRead = hadiths.find(h => h.TheNum === userData.lastReadId) || hadiths[0];
        return (
          <motion.div
            initial={settings.animationsEnabled ? { opacity: 0, x: 20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 pb-24 safe-pt"
          >
            {/* Hero Section */}
            <div className="relative h-64 rounded-3xl overflow-hidden bg-[var(--primary)] p-8 flex flex-col justify-end text-white shadow-xl shadow-emerald-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl" />
              
              <div className="relative z-10">
                <h1 className="text-4xl font-black mb-2">صحيح البخاري</h1>
                <p className="text-emerald-50 opacity-90">د رسول الله ﷺ د مبارکو حديثونو جامع ټولګه</p>
              </div>
            </div>

            {/* Books List Section */}
            <section>
              <h2 className="text-2xl font-black mb-6 px-2">د حديثونو کتابونه</h2>
              <div className="grid grid-cols-1 gap-4">
                {books.map(book => (
                  <button
                    key={book.arabic}
                    onClick={() => setSelectedBook(book.arabic)}
                    className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-right flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <BookOpen size={24} />
                      </div>
                      <span className="font-bold text-lg">{book.pashto}</span>
                    </div>
                    <ChevronLeft size={24} className="text-gray-300 group-hover:text-[var(--primary)]" />
                  </button>
                ))}
              </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--card)] p-4 rounded-2xl border border-[var(--border)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">ټول حديثونه</p>
                  <p className="text-lg font-bold">{hadiths.length}</p>
                </div>
              </div>
              <div className="bg-[var(--card)] p-4 rounded-2xl border border-[var(--border)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">لوستل شوي</p>
                  <p className="text-lg font-bold">{userData.readHadiths.length}</p>
                </div>
              </div>
            </div>

            {/* Continue Reading */}
            {lastRead && (
              <section>
                <div className="flex justify-between items-center mb-4 px-2">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Star size={20} className="text-yellow-500" />
                    د مطالعې ادامه
                  </h2>
                </div>
                <div 
                  onClick={() => {
                    setSelectedHadith(lastRead);
                    markAsRead(lastRead.TheNum);
                  }}
                  className="bg-[var(--card)] p-6 rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-[var(--primary)] bg-emerald-50 px-3 py-1 rounded-full">
                      حديث: {lastRead.TheNum}
                    </span>
                    <ArrowRight size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
                  </div>
                  <p className="text-sm line-clamp-2 text-gray-600 mb-2">{lastRead.Pashto}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{lastRead.Book_pashto} • {lastRead.Bab_pashto}</p>
                </div>
              </section>
            )}
          </motion.div>
        );

      case 'bookmarks':
        const bookmarkedHadiths = hadiths.filter(h => userData.bookmarks.includes(h.TheNum));
        return (
          <motion.div
            initial={settings.animationsEnabled ? { opacity: 0, x: 20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            className="pb-24 safe-pt"
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-2xl font-black">نښه شوي حديثونه</h2>
              <span className="text-xs text-gray-500 font-bold">{bookmarkedHadiths.length} حديثونه</span>
            </div>
            {bookmarkedHadiths.length > 0 ? (
              <div className="space-y-4">
                {bookmarkedHadiths.map(hadith => (
                  <div key={hadith.TheNum} onClick={() => setSelectedHadith(hadith)}>
                    <HadithCard hadith={hadith} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400 gap-4">
                <Bookmark size={64} strokeWidth={1} />
                <p>تاسې تر اوسه هيڅ حديث نښه کړی نه دی</p>
              </div>
            )}
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            initial={settings.animationsEnabled ? { opacity: 0, x: 20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            className="pb-24 safe-pt"
          >
            <h2 className="text-2xl font-black mb-6 px-2">تنظيمات</h2>
            <div className="space-y-4">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full p-6 bg-[var(--card)] rounded-3xl border border-[var(--border)] flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500">
                    <Star size={24} />
                  </div>
                  <div className="text-right">
                    <p className="font-bold">د اپليکېشن تنظيمات</p>
                    <p className="text-xs text-gray-500">رنګ، فونټ او نور بدلونونه</p>
                  </div>
                </div>
                <ChevronLeft size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
              </button>

              <button
                onClick={() => setIsAboutUsOpen(true)}
                className="w-full p-6 bg-[var(--card)] rounded-3xl border border-[var(--border)] flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500">
                    <Layers size={24} />
                  </div>
                  <div className="text-right">
                    <p className="font-bold">زموږ په اړه</p>
                    <p className="text-xs text-gray-500">د کاريال جوړوونکو په اړه معلومات</p>
                  </div>
                </div>
                <ChevronLeft size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
              </button>

              <div className="p-6 bg-[var(--card)] rounded-3xl border border-[var(--border)]">
                <h3 className="font-bold mb-4">د اپليکېشن په اړه</h3>
                <div className="space-y-4 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>نسخه</span>
                    <span className="font-bold">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ژبه</span>
                    <span className="font-bold">پښتو</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ډاټا</span>
                    <span className="font-bold">آفلاين</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 pt-8">
      <AnimatePresence mode="wait">
        {renderTab()}
      </AnimatePresence>

      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <SettingsDialog 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onAboutUsClick={() => setIsAboutUsOpen(true)}
      />

      <AboutUsDialog
        isOpen={isAboutUsOpen}
        onClose={() => setIsAboutUsOpen(false)}
      />

      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onHadithClick={(h) => {
          setSelectedHadith(h);
          markAsRead(h.TheNum);
        }}
      />

      <ExitDialog 
        isOpen={isExitOpen} 
        onClose={() => setIsExitOpen(false)} 
        onConfirm={() => {
          setIsExitOpen(false);
          CapApp.exitApp();
        }} 
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <HadithProvider>
        <MainApp />
      </HadithProvider>
    </ThemeProvider>
  );
}
