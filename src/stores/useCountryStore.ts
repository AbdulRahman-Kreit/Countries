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
};

export const useCountryStore = create<CountryStore>((set, get) => ({
    countries: [],
    filteredCountries: [],
    isLoading: true,
    error: null,
    searchQuery: '',
    selectedRegion: '',
    isDarkMode: true,
}));