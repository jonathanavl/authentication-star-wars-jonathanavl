import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Private = () => {
    const { actions, store } = useContext(Context);
    const [favorites, setFavorites] = useState({
        planets: [],
        characters: [],
        vehicles: []
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isLoggedIn) {
            navigate("/login");
        } else {
            fetchFavorites();
        }
    }, [store.isLoggedIn, navigate]);

    // Función para obtener los favoritos del store
    const fetchFavorites = () => {
        try {
            const userFavorites = {
                favorite_planets: store.favorites.favorite_planets || [],
                favorite_characters: store.favorites.favorite_characters || [],
                favorite_vehicles: store.favorites.favorite_vehicles || []
            };

            setFavorites({
                planets: userFavorites.favorite_planets,
                characters: userFavorites.favorite_characters,
                vehicles: userFavorites.favorite_vehicles
            });
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to load favorites");
        }
    };

    return (
        <div className="favorites-container">
            <h2>Favorites</h2>
            {error && <p className="error">{error}</p>}
            <hr className="white-line" />

            {favorites.characters.length > 0 && (
                <div className="mb-4">
                    <h4>Characters</h4>
                    <ul className="list-group">
                        {favorites.characters.map((character) => (
                            <li className="favorites-item" key={character.id}>
                                <span onClick={() => handleCharacters(character)}>{character.name}</span>
                                <div>
                                    <button onClick={() => actions.removeFavorites('character', character.id)}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {favorites.planets.length > 0 && (
                <div className="mb-4">
                    <h4>Planets</h4>
                    <ul className="list-group">
                        {favorites.planets.map((planet) => (
                            <li className="favorites-item" key={planet.id}>
                                <span onClick={() => handlePlanets(planet)}>{planet.name}</span>
                                <div>
                                    <button onClick={() => actions.removeFavorites('planet', planet.id)}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {favorites.vehicles.length > 0 && (
                <div className="mb-4">
                    <h4>Vehicles</h4>
                    <ul className="list-group">
                        {favorites.vehicles.map((vehicle) => (
                            <li className="favorites-item" key={vehicle.id}>
                                <span onClick={() => handleVehicles(vehicle)}>{vehicle.name}</span>
                                <div>
                                    <button onClick={() => actions.removeFavorites('vehicle', vehicle.id)}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {favorites.characters.length === 0 && favorites.planets.length === 0 && favorites.vehicles.length === 0 && (
                <p>No favorites found.</p>
            )}
        </div>
    );
};
