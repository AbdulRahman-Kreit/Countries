import { create } from "zustand";

export interface Country {
    cca3: string;
    name: {
        common: string;
        official?: string;
    };
    population: number;
    region: string;
    capital?: string[];
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    borders?: string[];
}

interface CountryStore {
    countries: Country[],
    filteredCountries: Country[];
    isLoading: boolean,
    error: string | null,
    searchQuery: string,
    selectedRegion: string,
    isDarkMode: boolean,

    toggleTheme: () => void,
    initTheme: () => void,
};

export const useCountryStore = create<CountryStore>((set, get) => ({
    countries: [],
    filteredCountries: [],
    isLoading: true,
    error: null,
    searchQuery: '',
    selectedRegion: '',
    isDarkMode: true,

    toggleTheme: () => {
        const switchMode = !get().isDarkMode;
        set({ isDarkMode: switchMode });

        localStorage.setItem('theme', switchMode ? 'dark' : 'light');
        if (switchMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('theme');

        const isDark = savedTheme ? savedTheme === 'dark' : true;
        set({ isDarkMode: isDark });

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
}));