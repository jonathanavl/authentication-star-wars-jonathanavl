import React from "react";
import soldado from "../../img/soldado.png";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const PlanetsCard = ({ handlePlanets }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="row d-flex flex-nowrap overflow-auto">
            {store.planets.map((planet) => (
                <div className="col-md-3 mb-4" key={planet}>
                    <div className="card">
                    <img
                            src={planet.image_url}
                            className="card-img-top"
                            alt={planet.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title text-warning">{planet.name}</h5>
                            <p className="text-light">Population: {planet.population}</p>
                            <p className="text-light">Climate: {planet.climate}</p>
                            <div className="d-flex justify-content-around">
                                <button
                                    onClick={() => handlePlanets(planet)} 
                                    className="learn-more-button me-3"
                                >
                                    Learn more
                                </button>
                                <button
                                    onClick={() => actions.toggleFavorites(planet.id, user.id)}
                                    className={`fav-button ${actions.isFavorite(planet.id) ? 'active' : ''}`}
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
