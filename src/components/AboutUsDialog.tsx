import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Facebook, MessageCircle, Send, Mail, Globe } from 'lucide-react';

interface AboutUsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsDialog: React.FC<AboutUsDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const SocialButton = ({ icon: Icon, label, href, color }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 p-3 rounded-xl text-white transition-transform hover:scale-105 ${color}`}
    >
      <Icon size={18} />
      <span className="text-xs font-bold">{label}</span>
    </a>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
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
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-500 text-white">
            <h2 className="text-xl font-bold">زموږ په اړه</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-8 pb-12">
            {/* Developer */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-r-4 border-emerald-500 pr-3">
                <h3 className="text-lg font-black text-gray-800">کاريال جوړوونکی</h3>
              </div>
              <p className="text-gray-600 font-bold">عبیدالله غفاري</p>
              <div className="grid grid-cols-2 gap-3">
                <SocialButton icon={Facebook} label="فیسبوک" href="https://facebook.com" color="bg-blue-600" />
                <SocialButton icon={MessageCircle} label="واټساپ" href="https://wa.me/123456789" color="bg-green-500" />
                <SocialButton icon={Send} label="ټلیګرام" href="https://t.me/obaidullah" color="bg-sky-500" />
                <SocialButton icon={Mail} label="ایمیل" href="mailto:example@gmail.com" color="bg-red-500" />
              </div>
            </section>

            {/* Contributor */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-r-4 border-blue-500 pr-3">
                <h3 className="text-lg font-black text-gray-800">مرسته کوونکي</h3>
              </div>
              <p className="text-gray-600 font-bold">الحاج ډاکټر فريدون احرار</p>
              <div className="grid grid-cols-2 gap-3">
                <SocialButton icon={MessageCircle} label="اړیکه" href="https://wa.me/987654321" color="bg-green-600" />
                <SocialButton icon={Globe} label="ویب پاڼه" href="#" color="bg-gray-700" />
              </div>
            </section>

            {/* Publisher */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-r-4 border-orange-500 pr-3">
                <h3 className="text-lg font-black text-gray-800">نشروونکې اداره</h3>
              </div>
              <p className="text-gray-600 font-bold">د اسلامي کاريالونو څانګه</p>
              <div className="grid grid-cols-2 gap-3">
                <SocialButton icon={Send} label="ټلیګرام چینل" href="https://t.me/islamicapps" color="bg-sky-600" />
                <SocialButton icon={MessageCircle} label="واټساپ چینل" href="https://whatsapp.com/channel/abc" color="bg-green-500" />
              </div>
            </section>

            <div className="pt-6 text-center text-gray-400 text-xs">
              <p>ټول حقوق له جوړوونکي سره خوندي دي © ۲۰۲۶</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
