import { create } from "zustand";
import { fetchData } from "../lib/fetchData";

export interface APICountry {
    uuid: string;
    names: {
        common: string;
        official?: string;
    };
    codes?: {
        alpha_2?: string;
        alpha_3?: string;
    };
    population: number;
    region: string;
    capitals?: Array<{
        name?: string;
    }>;
    flag?: {
        svg?: string;
        png?: string;
    };
}

interface CountryStore {
    countries: APICountry[];
    filteredCountries: APICountry[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    selectedRegion: string;
    isDarkMode: boolean;

    fetchCountry: () => Promise<void>;
    toggleTheme: () => void;
    initTheme: () => void;
}

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

        try {
            const rawData = await fetchData();

            const countriesList: APICountry[] = rawData?.data?.objects || [];

            if (countriesList.length > 0) {
                set({
                    countries: countriesList,
                    filteredCountries: countriesList,
                    isLoading: false,
                    error: null,
                });
            } else {
                set({
                    error: "No country data found!",
                    isLoading: false,
                });
            }
        } catch (err: any) {
            set({
                error: "Failed to fetch country data.",
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