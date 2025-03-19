const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = "https://api.rawg.io/api/games";

/**
 * Obtiene una lista de juegos desde RAWG.
 * @param {string} searchQuery - El texto de búsqueda (opcional).
 * @returns {Promise<Object[]>} - Lista de juegos.
 */
export async function getGames(searchQuery = "") {
    try {
        const url = new URL(API_URL);
        url.searchParams.append("key", API_KEY);
        if (searchQuery) {
            url.searchParams.append("search", searchQuery);
        }
        url.searchParams.append("ordering", "-rating");
        url.searchParams.append("page_size", "10");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        return data.results; // La API de RAWG devuelve los juegos en "results"
    } catch (error) {
        console.error("Error obteniendo juegos:", error);
        return [];
    }
}
