import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCountryStore } from "../stores/useCountryStore";
import PageHeading from "../components/PageHeading";
import { ArrowLeft } from "lucide-react";

export default function Details() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const countries = useCountryStore((state) => state.countries);
    const fetchCountry = useCountryStore((state) => state.fetchCountry);
    const isLoading = useCountryStore((state) => state.isLoading);

    useEffect(() => {
        if (countries.length === 0) {
        fetchCountry();
        }
    }, [countries.length, fetchCountry]);
    const country = countries.find((c) => c.uuid === id);

    if (isLoading) {
        return (
        <div className="w-full min-h-screen bg-(--bg-color) text-(--text-color)">
            <PageHeading />
            <div className="max-w-[1600px] mx-auto px-10 py-12">
                <p className="text-center text-lg">Loading country details...</p>
            </div>
        </div>
        );
    }

    if (!country) {
        return (
        <div className="w-full min-h-screen bg-(--bg-color) text-(--text-color)">
            <PageHeading />
            <div className="max-w-[1600px] mx-auto px-10 py-12">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-6 py-2 bg-(--elements-color) rounded-md shadow-md text-sm cursor-pointer mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <p className="text-center text-red-500 font-semibold text-lg">
                    Country not found!
                </p>
            </div>
        </div>
        );
    }

    const alpha2 = country.codes?.alpha_2?.toLowerCase();
    const flagUrl =
        country.flag?.svg || (alpha2 ? `https://flagcdn.com/${alpha2}.svg` : "");

    return (
        <div className="w-full min-h-screen bg-(--bg-color) text-(--text-color)">
            <PageHeading />

            <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
                <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-8 py-2.5 bg-(--elements-color) text-(--text-color) rounded-md shadow-md hover:opacity-90 transition-opacity cursor-pointer mb-16 text-sm font-medium"
                >
                <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    <div className="w-full">
                        <img
                        src={flagUrl}
                        alt={`${country.names?.common} flag`}
                        className="w-full h-auto max-h-100 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-8">
                            {country.names?.common || "Unknown"}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm mb-12 leading-relaxed">
                            <div className="flex flex-col gap-2">
                                <p>
                                    <span className="font-semibold">Native Name:</span>{" "}
                                    {country.names?.official || country.names?.common}
                                </p>
                                <p>
                                <span className="font-semibold">Population:</span>{" "}
                                    {country.population?.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-semibold">Region:</span>{" "}
                                    {country.region}
                                </p>
                                <p>
                                    <span className="font-semibold">Sub Region:</span>{" "}
                                </p>
                                <p>
                                <span className="font-semibold">Capital:</span>{" "}
                                    {country.capitals?.[0]?.name ?? "N/A"}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>
                                    <span className="font-semibold">Top Level Domain:</span> .be
                                </p>
                                <p>
                                    <span className="font-semibold">Currencies:</span> Euro
                                </p>
                                <p>
                                    <span className="font-semibold">Languages:</span> Dutch,
                                    French, German
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="font-semibold mr-2">Border Countries:</span>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-1.5 bg-(--elements-color) rounded shadow-sm text-xs">
                                    France
                                </span>
                                <span className="px-4 py-1.5 bg-(--elements-color) rounded shadow-sm text-xs">
                                Germany
                                </span>
                                <span className="px-4 py-1.5 bg-(--elements-color) rounded shadow-sm text-xs">
                                Netherlands
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}