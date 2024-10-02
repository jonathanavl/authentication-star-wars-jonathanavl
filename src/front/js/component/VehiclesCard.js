import React from "react";
import soldado from "../../img/soldado.png";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const VehiclesCard = ({ handleVehicles }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="row d-flex flex-nowrap overflow-auto">
            {store.vehicles.map((vehicle) => (
                <div className="col-md-3 mb-4" key={vehicle}>
                    <div className="card">
                    <img
                            src={vehicle.image_url}
                            className="card-img-top"
                            alt={vehicle.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title text-warning">{vehicle.name}</h5>
                            <p className="text-light">model: {vehicle.model}</p>
                            <p className="text-light">hp: {vehicle.hp}</p>
                            <div className="d-flex justify-content-around">
                                <button
                                    onClick={() => handleVehicles(vehicle)}
                                    className="learn-more-button me-3"
                                >
                                    Learn more
                                </button>
                                <button
                                    onClick={() => actions.toggleFavorites(vehicle.id)}
                                    className={`fav-button ${actions.isFavorite(vehicle) ? 'active' : ''}`}
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
