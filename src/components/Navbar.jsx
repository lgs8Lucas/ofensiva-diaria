import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDoorOpen,
	faFire,
	faHome,
	faUser,
	faUserAltSlash,
} from "@fortawesome/free-solid-svg-icons";

import offensiveLogo from "../assets/icons/daily-offensive-white.svg";

const Navbar = () => {
	const user = useAuthValue();
	const { logout } = useAuthentication();

	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={styles.logo}>
				<img src={offensiveLogo} alt="Logo da ofensiva diária"/>
				<span>Ofensiva Diária</span>
			</NavLink>
			<ul className={styles.links_list}>
				<li>
					<NavLink
						className={({ isActive }) => (isActive ? styles.active : "")}
						to="/"
					>
						<FontAwesomeIcon icon={faHome} />
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
								<FontAwesomeIcon icon={faUser} />
								Login
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) => (isActive ? styles.active : "")}
								to="/register"
							>
								<FontAwesomeIcon icon={faUserAltSlash} />
								Cadastrar
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
								<FontAwesomeIcon icon={faFire} />
								Ofensivas
							</NavLink>
						</li>
						<li>
							<button onClick={logout}>
								<FontAwesomeIcon icon={faDoorOpen} />
								Sair
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
