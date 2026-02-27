export interface Hadith {
  TheNum: string;
  Arabics: string;
  Pashto: string;
  Bab: string;
  Bab_pashto: string;
  Book: string;
  Book_pashto: string;
}

export type ThemeMode = 'light' | 'dark';

export interface AppSettings {
  primaryColor: string;
  arabicFontSize: number;
  pashtoFontSize: number;
  lineSpacing: number;
  animationsEnabled: boolean;
  arabicFont: string;
  pashtoFont: string;
  onboardingComplete: boolean;
}

export interface UserData {
  bookmarks: string[];
  readHadiths: string[];
  lastReadId: string | null;
}

export const THEME_COLORS = [
  '#10b981', // Emerald (Islamic Green)
  '#059669', // Darker Green
  '#0891b2', // Cyan
  '#4f46e5', // Indigo
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#dc2626', // Red
  '#ea580c', // Orange
  '#ca8a04', // Yellow
  '#57534e', // Stone
];

export const ARABIC_FONTS = [
  'Amiri',
  'Scheherazade New',
  'Traditional Arabic',
  'sans-serif'
];

export const PASHTO_FONTS = [
  'Lateef',
  'Noto Sans Pashto',
  'Inter',
  'Tahoma',
  'sans-serif'
];
