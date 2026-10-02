import { create } from "zustand";
import { fetchData } from "../lib/fetchData";

export interface Currency {
    code?: string;
    name?: string;
    symbol?: string;
}

export interface Language {
    iso639_1?: string;
    iso639_2?: string;
    name?: string;
    nativeName?: string;
}

export interface APICountry {
    uuid: string;
    nativeName?: string;
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
    subregion?: string;
    capitals?: Array<{
        name?: string;
    }>;
    flag?: {
        svg?: string;
        png?: string;
    };
    
    topLevelDomain?: string[]; 
    currencies?: Currency[];   
    languages?: Language[];   
    borders?: string[];       
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
    setSearchQuery: (query: string) => void;
    setSelectedRegion: (region: string) => void;
    toggleTheme: () => void;
    initTheme: () => void;
}

const applyFilters = (countries: APICountry[], query: string, region: string) => {
    const cleanedQuery = query.trim().toLowerCase();

    return countries.filter((country) => {
        const commonName = country.names?.common?.toLowerCase() || "";
        const officialName = country.names?.official?.toLowerCase() || "";
        
        const matchesSearch = commonName.includes(cleanedQuery) || officialName.includes(cleanedQuery);

        const matchesRegion = 
            region === "" || 
            region === "All Regions" || 
            region === "All" || 
            country.region === region;

        return matchesSearch && matchesRegion;
    });
};

export const useCountryStore = create<CountryStore>((set, get) => ({
    countries: [],
    filteredCountries: [],
    isLoading: true,
    error: null,
    searchQuery: '',
    selectedRegion: 'All Regions',
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

    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        const { countries, selectedRegion } = get();
        
        const updatedList = applyFilters(countries, query, selectedRegion);
        set({ filteredCountries: updatedList });
    },

    setSelectedRegion: (region: string) => {
        set({ selectedRegion: region });
        const { countries, searchQuery } = get();

        const updatedList = applyFilters(countries, searchQuery, region);
        set({ filteredCountries: updatedList });
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