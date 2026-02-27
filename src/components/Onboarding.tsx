import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Search, Bookmark, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

const slides = [
  {
    title: 'صحيح البخاري ته ښه راغلاست',
    description: 'د رسول الله ﷺ د مبارکو حديثونو جامع او مستنده ټولګه په پښتو ژبه کې.',
    icon: Book,
    color: 'bg-emerald-500',
  },
  {
    title: 'اسانه لټون',
    description: 'تاسې کولی شئ حديثونه د متن او يا هم د حديث د شمېرې په واسطه په اسانۍ سره ولټوئ.',
    icon: Search,
    color: 'bg-blue-500',
  },
  {
    title: 'نښه کول او يادښت',
    description: 'خپل د خوښې حديثونه نښه کړئ ترڅو په راتلونکي کې ورته په اسانۍ لاسرسی ولرئ.',
    icon: Bookmark,
    color: 'bg-orange-500',
  },
];

export const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { settings } = useTheme();

  const next = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--background)] flex flex-col items-center justify-center p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <div className={`w-24 h-24 ${slide.color} rounded-3xl flex items-center justify-center text-white shadow-lg mb-8`}>
            <Icon size={48} />
          </div>
          <h2 className="text-2xl font-black mb-4">{slide.title}</h2>
          <p className="text-gray-500 leading-relaxed">{slide.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-8 right-8 flex items-center justify-between">
        <button
          onClick={prev}
          className={`p-4 rounded-2xl bg-gray-100 text-gray-400 transition-all ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ArrowRight size={24} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-[var(--primary)]' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-4 rounded-2xl bg-[var(--primary)] text-white shadow-lg shadow-emerald-500/30"
        >
          {currentSlide === slides.length - 1 ? (
            <span className="font-bold px-4">پيل کړئ</span>
          ) : (
            <ArrowLeft size={24} />
          )}
        </button>
      </div>
    </div>
  );
};
