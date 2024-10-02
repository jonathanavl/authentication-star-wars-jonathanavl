import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const InfoCharacters  = ({ character }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5 card-info-container">
            {store.characters.map((character, index) => (
                <div key={index} className="row d-flex justify-content-around align-items-center">
                    <div className="col-md-6">
                        <img
                            src={character.image_url}
                            className="card-img-top"
                            alt={character.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{character.name}</h1>
                        <br />
                        <p>{character.biography}</p>
                    </div>
                    <div style={{ height: '5px' }} className="border m-5 bg-warning"></div>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-2">
                            <h5 className="text-warning">Name</h5>
                            <p>{character.name}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">Species</h5>
                            <p>{character.species}</p>
                        </div>
                        <div className="col-md-2">
                            <h5 className="text-warning">Homeworld</h5>
                            <p>{character.homeworld}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
    );
};