import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Asegúrate de que la ruta es correcta
import "./index.css"; // Si tienes estilos globales

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
