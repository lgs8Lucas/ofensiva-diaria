import React from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Offensives = () => {
	const user = useAuthValue();

	const {
		documents: offensives,
		loading,
		error,
	} = useFetchDocuments("offensives", user.uid);

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<main>
			<h1>Offensivas</h1>
			<p>Veja todas as suas offensivas</p>
			{offensives && offensives.length === 0 ? (
				<p>
					Você ainda não tem nenhuma offensiva.{" "}
					<Link to="/offensives/create">Crie já</Link>
				</p>
			) : (
				<ul>
					{offensives && offensives.map((offensive) => (
						<li key={offensive.id}>
							{offensive.goal}
						</li>
					))}
				</ul>
			)}
			<p>
				Crie ainda mais offensivas! <Link to="/offensives/create">Crie já</Link>
			</p>
		</main>
	);
};

export default Offensives;
