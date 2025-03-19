import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3001;

app.use(express.json());

app.post("/games", async (req, res) => {
    const response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Client-ID": process.env.VITE_TWITCH_CLIENT_ID,
            "Authorization": `Bearer ${process.env.VITE_TWITCH_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
