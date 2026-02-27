import { AppSettings, UserData } from '../types';

const SETTINGS_KEY = 'bukhari_settings';
const USER_DATA_KEY = 'bukhari_user_data';

const DEFAULT_SETTINGS: AppSettings = {
  primaryColor: '#10b981',
  arabicFontSize: 24,
  pashtoFontSize: 18,
  lineSpacing: 1.8,
  animationsEnabled: true,
  arabicFont: 'Amiri',
  pashtoFont: 'Lateef',
  onboardingComplete: false,
};

const DEFAULT_USER_DATA: UserData = {
  bookmarks: [],
  readHadiths: [],
  lastReadId: null,
};

export const storage = {
  getSettings: (): AppSettings => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  },
  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },
  getUserData: (): UserData => {
    const saved = localStorage.getItem(USER_DATA_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_USER_DATA;
  },
  saveUserData: (data: UserData) => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  },
};

