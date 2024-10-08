import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { LoginPage } from "./pages/loginpage";
import { SignupPage } from "./pages/singuppage";

import { FavoritesCard } from "./pages/privatepage";
import { InfoPage } from "./pages/Infopage";
import { InfoCharacters } from "./component/infoCharacter";
import { InfoVehicles } from "./component/infoVehicles";
import { InfoPlanets } from "./component/infoPlanets";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div className="background">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<SignupPage />} path="/signup" />
                        <Route path="/infoPage" element={<InfoPage />}>
                            <Route path="infoCharacters" element={<InfoCharacters />} />
                            <Route path="infoVehicles" element={<InfoVehicles />} />
                            <Route path="infoPlanets" element={<InfoPlanets />} />
                        </Route>
                        <Route element={<FavoritesCard />} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);