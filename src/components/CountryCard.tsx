interface CountryCardProps {
    uuid: string;
    flag?: string;
    name: string;
    population: number;
    region: string;
    capital?: string;
}

export default function CountryCard({
    flag,
    name,
    population,
    region,
    capital,
}: CountryCardProps) {
    return (
        <div className="w-full bg-(--elements-color) rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col">
            <div className="w-full h-40 overflow-hidden bg-gray-200 dark:bg-gray-700">
                {flag ? (
                    <img
                        src={flag}
                        alt={name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No Flag
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-lg mb-4 truncate" title={name}>
                    {name}
                </h3>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Population: </span>
                    {population ? population.toLocaleString() : 0}
                </p>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Region: </span>
                    {region || 'N/A'}
                </p>
                <p className="text-sm">
                    <span className="font-semibold">Capital: </span>
                    {capital}
                </p>
            </div>
        </div>
    );
}