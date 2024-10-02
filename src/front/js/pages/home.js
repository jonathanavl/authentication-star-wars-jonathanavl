import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CharactersCard } from "../component/CharactersCard";
import { PlanetsCard } from "../component/PlanetsCard";
import { VehiclesCard } from "../component/VehiclesCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			await actions.getCharacters(); 
			await actions.getPlanets();
			await actions.getVehicles();
		};
		fetchData();
	}, []);

	const handleCharacters = (character) => {
        navigate('/infoPage/infoCharacters', { state: character });
    };
    const handlePlanets = (planet) => {
        navigate('/infoPage/infoPlanets', { state: planet });
    };
	const handleVehicles = (vehicle) => {
        navigate('/infoPage/infoVehicles', { state: vehicle });
    };
	return (
		<>
			<div className="container">
				<h1 className="text-warning mb-4">Characters</h1>
				<CharactersCard store={store} actions={actions} handleCharacters={handleCharacters} />
			</div>
			<div className="container">
				<h1 className="text-warning mb-4">Planets</h1>
				<PlanetsCard store={store} actions={actions} handlePlanets={handlePlanets} />
			</div>
			<div className="container">
				<h1 className="text-warning mb-4">Vehicles</h1>
				<VehiclesCard store={store} actions={actions} handleVehicles={handleVehicles} />
			</div>
		</>
	)
}