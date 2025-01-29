import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<NavLink to="/">Ofensiva Diária</NavLink>
			<ul className={styles.links_list}>
				<li>
					<NavLink
						className={({ isActive }) => (isActive ? styles.active : "")}
						to="/"
					>
						Início
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) => (isActive ? styles.active : "")}
						to="/login"
					>
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						className={({ isActive }) => (isActive ? styles.active : "")}
						to="/register"
					>
						Cadastre-se
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
