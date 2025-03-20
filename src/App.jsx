import { useState, useEffect } from "react";
import { getGames } from "./api/rawg.js";
import axios from "axios";
import "./styles.css"; // Importa el CSS

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function App() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [filters, setFilters] = useState({
        genre: "",
        platform: "",
    });

    // Obtener los juegos al inicio
    useEffect(() => {
        async function fetchGames() {
            const data = await getGames();
            setGames(data);
            setFilteredGames(data);
        }
        fetchGames();
    }, []);

    // Obtener géneros y plataformas para los filtros
    useEffect(() => {
        async function fetchFilters() {
            const [genresRes, platformsRes] = await Promise.all([
                axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`),
                axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`),
            ]);

            setGenres(genresRes.data.results);
            setPlatforms(platformsRes.data.results);
        }
        fetchFilters();
    }, []);

    // Manejar cambios en los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Filtrar juegos según selección
    useEffect(() => {
        let filtered = games;

        if (filters.genre) {
            filtered = filtered.filter((game) =>
                game.genres.some((g) => g.id == filters.genre)
            );
        }

        if (filters.platform) {
            filtered = filtered.filter((game) =>
                game.platforms.some((p) => p.platform.id == filters.platform)
            );
        }

        setFilteredGames(filtered);
    }, [filters, games]);

    return (
        <div className="container">
            <h1>Lista de Videojuegos</h1>

            {/* Filtros */}
            <div className="filters">
                <label>Género:</label>
                <select name="genre" value={filters.genre} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <label>Plataforma:</label>
                <select name="platform" value={filters.platform} onChange={handleFilterChange}>
                    <option value="">Todas</option>
                    {platforms.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de juegos */}
            {filteredGames.length === 0 ? (
                <p>No se encontraron juegos.</p>
            ) : (
                <ul className="games-list">
                    {filteredGames.map((game) => (
                        <li key={game.id} className="game-card">
                            {game.background_image && (
                                <img src={game.background_image} alt={game.name} />
                            )}
                            <h2>{game.name}</h2>
                            <p>⭐ {game.rating}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
