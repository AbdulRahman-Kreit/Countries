import { useEffect } from 'react';
import { useCountryStore } from '../stores/useCountryStore';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeading from "../components/PageHeading";
import Controls from '../components/Controls';
import CountryCard from "../components/CountryCard";

export default function Home() {
    const filteredCountries = useCountryStore((state) => state.filteredCountries);
    const fetchCountry = useCountryStore((state) => state.fetchCountry);
    const loading = useCountryStore((state) => state.isLoading);
    const error = useCountryStore((state) => state.error);

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry]);

    return (
        <main className="w-full min-h-screen">
            <PageHeading />
            <Controls />

            <div className="max-w-[1600px] mx-auto px-6 py-8 w-full">

                {loading && (
                    <div className="flex justify-center items-center min-h-75">
                        <LoadingSpinner />
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center py-10 text-red-500 font-semibold text-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full">
                        {filteredCountries.map((country) => {
                            const alpha2 = country.codes?.alpha_2?.toLowerCase();
                            const flagUrl = country.flag?.svg || (alpha2 ? `https://flagcdn.com/${alpha2}.svg` : '');

                            return (
                                <CountryCard 
                                    key={country.uuid}
                                    uuid={country.uuid}
                                    flag={flagUrl}
                                    name={country.names?.common || 'Unknown'}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capitals?.[0]?.name ?? 'N/A'}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}