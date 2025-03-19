const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const ACCESS_TOKEN = import.meta.env.VITE_TWITCH_ACCESS_TOKEN;

const API_URL = "https://api.igdb.com/v4/games";

/**
 * Obtiene una lista de juegos desde IGDB.
 * @param {string} searchQuery - Texto de búsqueda (opcional).
 * @returns {Promise<Object[]>} - Lista de juegos.
 */
export async function getGames(searchQuery = "") {
    const headers = {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "text/plain",
        "Accept": "application/json"
    };

    const body = `
        fields name, rating, cover.url;
        limit 10;
        ${searchQuery ? `search "${searchQuery}";` : "sort rating desc;"}
    `;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
        }
        console.log("Access Token:", import.meta.env.VITE_TWITCH_ACCESS_TOKEN);
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo juegos:", error);
        return [];
    }
}
