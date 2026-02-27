import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Type, Palette, Activity, Trash2, ChevronLeft } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useHadiths } from './HadithContext';
import { THEME_COLORS, ARABIC_FONTS, PASHTO_FONTS } from '../types';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAboutUsClick: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose, onAboutUsClick }) => {
  const { settings, updateSettings } = useTheme();
  const { clearReadHistory } = useHadiths();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-[var(--card)] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
            <h2 className="text-xl font-bold">تنظيمات</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-8">
            {/* About Us Button */}
            <section>
              <button
                onClick={() => {
                  onAboutUsClick();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-5 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 group transition-transform active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Palette size={24} />
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">زموږ په اړه</p>
                    <p className="text-xs opacity-80">د کاريال جوړوونکو په اړه معلومات</p>
                  </div>
                </div>
                <ChevronLeft size={24} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            </section>

            {/* Primary Colors */}
            <section>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">اصلي رنګ</h3>
              <div className="flex flex-wrap gap-3">
                {THEME_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => updateSettings({ primaryColor: color })}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                      settings.primaryColor === color ? 'ring-4 ring-offset-2 ring-emerald-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </section>

            {/* Typography */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <Type size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">ليک او فونټ</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">د عربي فونټ اندازه ({settings.arabicFontSize}px)</label>
                  <input 
                    type="range" min="16" max="48" 
                    value={settings.arabicFontSize}
                    onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                    className="w-full accent-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">د پښتو فونټ اندازه ({settings.pashtoFontSize}px)</label>
                  <input 
                    type="range" min="12" max="32" 
                    value={settings.pashtoFontSize}
                    onChange={(e) => updateSettings({ pashtoFontSize: parseInt(e.target.value) })}
                    className="w-full accent-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">د کرښو ترمنځ فاصله ({settings.lineSpacing})</label>
                  <input 
                    type="range" min="1.2" max="3.0" step="0.1"
                    value={settings.lineSpacing}
                    onChange={(e) => updateSettings({ lineSpacing: parseFloat(e.target.value) })}
                    className="w-full accent-[var(--primary)]"
                  />
                </div>
              </div>
            </section>

            {/* Animations */}
            <section>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Activity size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">انيميشنونه</p>
                    <p className="text-xs text-gray-500">د اپليکېشن حرکتونه فعال کړئ</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.animationsEnabled ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.animationsEnabled ? 'right-7' : 'right-1'}`} />
                </button>
              </div>
            </section>

            {/* History */}
            <section className="pt-4">
              <button
                onClick={() => {
                  if (confirm('ايا تاسې غواړئ د لوستلو تاريخچه پاکه کړئ؟')) {
                    clearReadHistory();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-50 rounded-2xl font-medium hover:bg-red-100 transition-colors"
              >
                <Trash2 size={20} />
                پاکول د لوستلو تاريخچه
              </button>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
