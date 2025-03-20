// Importamos los hooks de React que nos permiten manejar estado y efectos
import { useState, useEffect } from "react";
// Importamos la función para obtener los juegos desde la API
import { getGames } from "./api/rawg.js";
// Importamos los estilos CSS
import "./styles.css";

function App() {
    // Estado para almacenar la lista de videojuegos obtenidos de la API
    const [games, setGames] = useState([]);
    // Estado para almacenar los juegos filtrados según los criterios del usuario
    const [filteredGames, setFilteredGames] = useState([]);
    // Estado para el término de búsqueda por nombre
    const [search, setSearch] = useState("");
    // Estado para filtrar por género
    const [genre, setGenre] = useState("");
    // Estado para filtrar por año de lanzamiento
    const [year, setYear] = useState("");

    // useEffect que obtiene los juegos al cargar la aplicación
    useEffect(() => {
        async function fetchGames() {
            const data = await getGames(); // Llamamos a la API para obtener los juegos
            setGames(data); // Guardamos todos los juegos en el estado
            setFilteredGames(data); // Inicialmente mostramos todos los juegos sin filtros
        }
        fetchGames(); // Ejecutamos la función al montar el componente
    }, []);

    // useEffect que actualiza la lista de juegos cuando cambian los filtros
    useEffect(() => {
        let filtered = games; // Empezamos con todos los juegos

        // Filtramos por nombre si el usuario ha ingresado texto en el buscador
        if (search) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filtramos por género si el usuario ha seleccionado un género
        if (genre) {
            filtered = filtered.filter(game =>
                game.genres.some(g => g.name === genre)
            );
        }

        // Filtramos por año de lanzamiento si el usuario ha ingresado un año
        if (year) {
            filtered = filtered.filter(game =>
                new Date(game.released).getFullYear().toString() === year
            );
        }

        setFilteredGames(filtered); // Actualizamos la lista de juegos filtrados
    }, [search, genre, year, games]); // Este efecto se ejecuta cuando cambian los filtros o los juegos

    return (
        <div className="container">
            <h1>Lista de Videojuegos</h1>

            {/* Sección de filtros */}
            <div className="filters">
                {/* Campo de búsqueda por nombre */}
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                {/* Filtro de género */}
                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value="">Todos los géneros</option>
                    <option value="Action">Acción</option>
                    <option value="RPG">RPG</option>
                    <option value="Adventure">Aventura</option>
                </select>
                
                {/* Filtro por año de lanzamiento */}
                <input
                    type="number"
                    placeholder="Año"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>

            {/* Mostramos mensaje si no hay juegos filtrados */}
            {filteredGames.length === 0 ? (
                <p>No se encontraron juegos.</p>
            ) : (
                /* Renderizamos la lista de juegos filtrados */
                <ul className="games-list">
                    {filteredGames.map((game) => (
                        <li key={game.id} className="game-card">
                            {/* Mostramos la imagen del juego si existe */}
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
