import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
	const user = useAuthValue();

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
				{!user ? (
					<>
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
					</>
				) : (
					<>
						<li>
							<NavLink
								className={({ isActive }) => (isActive ? styles.active : "")}
								to="/offensives"
							>
								Ofensivas
							</NavLink>
						</li>
						<span className={styles.user}><li>{user.displayName}</li></span>
					</>
				)}
			</ul>
			
		</nav>
	);
};

export default Navbar;
