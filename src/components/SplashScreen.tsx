import React from 'react';
import { motion } from 'motion/react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-[var(--primary)] flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 bg-white/20 rounded-[40px] flex items-center justify-center mb-8 backdrop-blur-md border border-white/30">
          <span className="text-6xl font-black">ص</span>
        </div>
        <h1 className="text-4xl font-black tracking-wider mb-2">صحيح البخاري</h1>
        <p className="text-emerald-100 font-medium opacity-80">پښتو ژباړه او شرحه</p>
      </motion.div>
      
      <div className="absolute bottom-12">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-emerald-100 text-sm font-bold tracking-widest uppercase"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};
