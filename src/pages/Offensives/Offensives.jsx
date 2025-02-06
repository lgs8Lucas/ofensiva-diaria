import React from "react";
import { Link } from "react-router-dom";

const Offensives = () => {
	return (
		<main>
			Ainda não tem uma offensiva? <Link to="/offensives/create">Crie já</Link>
		</main>
	);
};

export default Offensives;
