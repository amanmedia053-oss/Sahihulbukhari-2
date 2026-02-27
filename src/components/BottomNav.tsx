import React from 'react';
import { Home, BookOpen, Bookmark, Settings, Search } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, onSearchClick }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'کور' },
    { id: 'search', icon: Search, label: 'لټون', action: onSearchClick },
    { id: 'bookmarks', icon: Bookmark, label: 'نښې' },
    { id: 'settings', icon: Settings, label: 'تنظيمات' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] px-4 py-2 flex justify-around items-center z-40 safe-pb">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => tab.action ? tab.action() : setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              isActive 
                ? 'text-[var(--primary)]' 
                : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-[var(--primary)] mt-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
