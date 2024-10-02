import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const InfoPlanets = ({ planet }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5 card-info-container">
            {store.planets.map((planet, index) => (
                <div key={index} className="row d-flex justify-content-around align-items-center">
                    <div className="col-md-6">
                        <img
                            src={planet.image_url}
                            className="card-img-top"
                            alt={planet.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{planet.name}</h1>
                        <br />
                        <p>{planet.biography}</p>
                    </div>
                    <div style={{ height: '5px' }} className="border m-5 bg-warning"></div>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-2">
                            <h5 className="text-warning">Name</h5>
                            <p>{planet.name}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">Climate</h5>
                            <p>{planet.climate}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">Terrain</h5>
                            <p>{planet.terrain}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">population</h5>
                            <p>{planet.population}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};