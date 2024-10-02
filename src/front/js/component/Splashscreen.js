import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext"; 
import logo from '../../img/star-wars.png';
import "../../styles/index.css";

export const SplashScreen = () => {
    const { actions } = useContext(Context);
    const [visible, setVisible] = useState(true);
    const [lightsaberActive, setLightsaberActive] = useState(false);

    useEffect(() => {
        // Activar el sable láser después de un breve retraso para que se vea la animación
        const lightsaberTimer = setTimeout(() => {
            setLightsaberActive(true);
        }, 500);

        const hideTimer = setTimeout(() => {
            setVisible(false);
            actions.hideSplashScreen();
        }, 2500); // Aumentado a 2.5 segundos para dar tiempo a la animación del sable

        return () => {
            clearTimeout(lightsaberTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className={`splash-screen ${visible ? 'visible' : 'hidden'}`}>
            <img src={logo} alt="Logo" className="splash-logo" />
            <div className="lightsaber-container">
                <div className={`lightsaber ${lightsaberActive ? 'active' : ''}`}></div>
            </div>
        </div>
    );
};