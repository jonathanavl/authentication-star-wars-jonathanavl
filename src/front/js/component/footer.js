import React from "react";
import "../../styles/index.css";
import logo from "../../img/star-wars.png";


export const Footer = () => (
	<footer className="footer mt-auto py-3 star-wars-footer">
		<div className="footer-content">
			<div className="footer-logo">
			<img src={logo} width="150" height="auto"/>
			</div>
			<nav className="footer-nav">
				<ul>
					<li><a href="#">Home </a></li>
					<li><a href="#">Characters </a></li>
					<li><a href="#">Movies</a></li>
					<li><a href="#">Gallery</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
			<div className="social-icons">
				<a href="#" className="fab fa-facebook"></a>
				<a href="#" className="fab fa-twitter"></a>
				<a href="#" className="fab fa-instagram"></a>
				<a href="#" className="fab fa-youtube"></a>
			</div>
		</div>
		<div className="footer-bottom">
			<p>&copy; 2023 Star Wars. All rights reserved. May the Force be with you.</p>
		</div>
	</footer>
);