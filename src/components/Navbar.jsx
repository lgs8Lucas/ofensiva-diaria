import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
	return <nav>
        <NavLink to="/">
            Ofensiva Diária
        </NavLink>
        <ul>
            <li>
                <NavLink to="/">
                    Início
                </NavLink>
            </li>
            <li>
                <NavLink to="/login">
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/register">
                    Cadastre-se
                </NavLink>
            </li>
        </ul>
    </nav>;
};

export default Navbar;
