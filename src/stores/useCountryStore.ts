import { create } from "zustand";
import { fetchData } from "../lib/fetchData";

export interface Country {
    alpha3Code: string; 
    name: string;       
    population: number;
    region: string;
    capital?: string;   
    flags: {
        png: string;
        svg: string;
    };
    flag?: string;
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

    fetchCountry: () => Promise<void>,    
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

    fetchCountry: async () => {
        set({ isLoading: true, error: null });

        const rawData = await fetchData();

        const countriesList = Array.isArray(rawData) 
            ? rawData 
            : (rawData?.data || rawData?.countries || []);

        if (countriesList.length > 0) {
            set({
                countries: countriesList,
                filteredCountries: countriesList,
                isLoading: false,
                error: null,
            });
        } else {
            set({
                error: "Country loading had failed!",
                isLoading: false,
            });
        }
    },

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