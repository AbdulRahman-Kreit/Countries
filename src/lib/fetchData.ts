import process from "process";

const API_KEY = process.env.COUNTRIES_API_KEY;

export async function fetchData() {
    const url = `https://api.example.com/data?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data fetched successfully!", data);
        return data;
    } catch(err) {
        console.error("Data fetch failed:", err.message)
    }
}