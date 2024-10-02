import React, { useContext, useEffect } from "react";
import logo from "../../img/star-wars.png";
import soldado from "../../img/soldado.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.isLoggedIn) {
            actions.getCurrentUser();
        }
    }, [store.isLoggedIn]);

    const handleLogout = () => {
        actions.logout();
        setTimeout(() => {
            navigate("/");
        }, 100);
    };

    const handleRedirect = () => {
        navigate("/private");
    };

    return (
        <nav className="navbar navbar-expand-lg dark">
            <div className="container">
                <Link to="/" className="navbar-logo">
                    <img
                        src={logo}
                        width="200"
                        height="auto"
                        className=""
                        alt="Star Wars Logo"
                    />
                </Link>
                {/* Toggler for mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="ml-auto d-flex">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {store.isLoggedIn ? (
                            <>
                                <div className="m-auto">
                                    <p className="mb-0 mx-3">
                                        @{store.currentUser?.username || "Usuario"}
                                    </p>
                                </div>
                                <div className="m-auto">
                                    <button
                                        className="fav-button"
                                        onClick={handleRedirect}
                                    >
                                        Favorites
                                    </button>
                                </div>
                                <div className="dropdown d-none d-md-block">
                                    <button
                                        className="fav-button dropdown-toggle me-2"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src={soldado}
                                            width="25"
                                            height="auto"
                                            alt="Soldado"
                                        />
                                    </button>
                                    <ul className="dropdown-menu">
                                        {store.favorites?.length > 0 ? (
                                            store.favorites.map((item, index) => (
                                                <li
                                                    className="dropdown-item d-flex justify-content-between align-items-center"
                                                    key={index}
                                                >
                                                    {item.name}
                                                    <span
                                                        className="delete-btn btn btn-sm fs-3"
                                                        onClick={() =>
                                                            actions.toggleFavorites(item.id, item.type)
                                                        }
                                                    >
                                                        &times;
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="dropdown-item">Empty</li>
                                        )}
                                    </ul>
                                </div>
                                <button
                                    className="fav-button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="fav-button mx-2">Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="fav-button">Sign Up</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
