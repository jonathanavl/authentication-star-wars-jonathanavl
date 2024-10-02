import React from "react";
import soldado from "../../img/soldado.png";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const CharactersCard = ({ handleCharacters }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="row d-flex flex-nowrap overflow-auto">
            {store.characters.map((character) => (
                <div className="col-md-3 mb-4" key={character.id}>  {/* Usa character.id como clave */}
                    <div className="card">
                        <img
                            src={character.image_url}
                            className="card-img-top"
                            alt={character.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title text-warning">{character.name}</h5>
                            <p className="text-light">species: {character.species}</p>
                            <p className="text-light">homeworld: {character.homeworld}</p>
                            <div className="d-flex justify-content-around">
                                <button
                                    onClick={() => handleCharacters(character)}  // Usa handleCharacters correctamente
                                    className="learn-more-button me-3"
                                >
                                    Learn more
                                </button>
                                <button
                                    onClick={() => actions.toggleFavorites(character.id)}  // Usa character.id
                                    className={`fav-button ${actions.isFavorite(character.id) ? 'active' : ''}`}  // Verifica si es favorito con character.id
                                >
                                    <img
                                        src={soldado}
                                        width="20"
                                        height="auto"
                                        alt="Favorite"
                                    />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};