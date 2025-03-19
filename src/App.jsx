import { useState, useEffect } from "react";
import { getGames } from "./api/rawg.js";
import "./styles.css"; // Importa el CSS

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchGames() {
            const data = await getGames();
            setGames(data);
        }
        fetchGames();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Videojuegos</h1>
            {games.length === 0 ? (
                <p>No se encontraron juegos.</p>
            ) : (
                <ul className="games-list">
                    {games.map((game) => (
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
    