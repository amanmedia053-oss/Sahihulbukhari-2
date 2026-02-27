import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut } from 'lucide-react';

interface ExitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ExitDialog: React.FC<ExitDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm bg-[var(--card)] rounded-3xl shadow-2xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut size={32} />
          </div>
          
          <h2 className="text-xl font-bold mb-2">له اپليکېشن څخه وتل</h2>
          <p className="text-gray-500 mb-8">ايا تاسې غواړئ له اپليکېشن څخه ووځئ؟</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="p-4 rounded-2xl bg-gray-100 font-bold hover:bg-gray-200 transition-colors"
            >
              نه
            </button>
            <button
              onClick={onConfirm}
              className="p-4 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-lg shadow-red-500/30 transition-colors"
            >
              هو
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
