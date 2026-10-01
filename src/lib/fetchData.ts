export async function fetchData() {
    const API_KEY = import.meta.env.VITE_COUNTRIES_API_KEY;
    const url = `/api_countries/countries/v5`;

    

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
                
            }
        });
        if (!response.ok) {
            let errorDetails = "";
            try {
                const errorJson = await response.json();
                errorDetails = JSON.stringify(errorJson);
            } catch (e) {
                errorDetails = await response.text();
            }
            throw new Error(`Response error: ${response.status} - Details: ${errorDetails}`);
        }
        const data = await response.json();
        console.log("Data fetched successfully!", data);
        return data;
    } catch(err: any) {
        console.error("Data fetch failed:", err.message);
        return [];
    }
}

