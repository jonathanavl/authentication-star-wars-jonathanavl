import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const InfoVehicles = ({ vehicle }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5 card-info-container">
            {store.vehicles.map((vehicle, index) => (
                <div key={index} className="row d-flex justify-content-around align-items-center">
                    <div className="col-md-6">
                        <img
                            src={vehicle.image_url}
                            className="card-img-top"
                            alt={vehicle.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{vehicle.name}</h1>
                        <br />
                        <p>{vehicle.biography}</p>
                    </div>
                    <div style={{ height: '5px' }} className="border m-5 bg-warning"></div>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-2">
                            <h5 className="text-warning">Name</h5>
                            <p>{vehicle.name}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">Model</h5>
                            <p>{vehicle.model}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">Hp</h5>
                            <p>{vehicle.hp}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};