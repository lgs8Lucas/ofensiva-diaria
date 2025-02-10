import React from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import OffensiveCard from "./OffensiveCard";
import styles from "./Offensives.module.css";

const Offensives = () => {
	const user = useAuthValue();

	const {
		documents: offensives,
		loading,
		error,
	} = useFetchDocuments("offensives", user.uid);

	const { deleteDocument, response: delResponse } =
		useDeleteDocument("offensives");

	const deleteOffensive = (id) => {
		deleteDocument(id);
	};

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<main>
			<div className="container">
				<h1>Acompanhe suas ofensivas</h1>
				<p>Veja todas as suas offensivas</p>
				{offensives && offensives.length === 0 ? (
					<p>
						Você ainda não tem nenhuma offensiva.{" "}
						<Link to="/offensives/create">Crie já</Link>
					</p>
				) : (
					<ul className={styles.list}>
						{offensives &&
							offensives.map((offensive) => (
								<OffensiveCard
									offensive={offensive}
									key={offensive.id}
									deleteOffensive={deleteOffensive}
								/>
							))}
					</ul>
				)}
				{delResponse.error && <p className="error">{delResponse.error}</p>}
				<p>
					Crie ainda mais offensivas!{" "}
					<Link to="/offensives/create">Clicando aqui!</Link>
				</p>
			</div>
		</main>
	);
};

export default Offensives;
