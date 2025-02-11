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
	faUserAlt,
	faUserAltSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons/faUserCheck";

const Navbar = () => {
	const user = useAuthValue();
	const { logout } = useAuthentication();

	return (
		<nav className={styles.navbar}>
			<NavLink to="/">Ofensiva Diária</NavLink>
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
