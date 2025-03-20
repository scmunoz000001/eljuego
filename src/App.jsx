import { useState, useEffect } from "react";
import { getGames } from "./api/rawg.js";
import "./styles.css"; // Importa el CSS

function App() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        async function fetchGames() {
            const data = await getGames();
            setGames(data);
            setFilteredGames(data); // Inicialmente muestra todos
        }
        fetchGames();
    }, []);

    useEffect(() => {
        let filtered = games;

        if (search) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (genre) {
            filtered = filtered.filter(game =>
                game.genres.some(g => g.name === genre)
            );
        }

        if (year) {
            filtered = filtered.filter(game =>
                new Date(game.released).getFullYear().toString() === year
            );
        }

        setFilteredGames(filtered);
    }, [search, genre, year, games]);

    return (
        <div className="container">
            <h1>Lista de Videojuegos</h1>

            {/* Filtros */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value="">Todos los géneros</option>
                    <option value="Action">Acción</option>
                    <option value="RPG">RPG</option>
                    <option value="Adventure">Aventura</option>
                </select>
                <input
                    type="number"
                    placeholder="Año"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>

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
