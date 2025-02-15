import React from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useSetOffensive } from "../../hooks/useSetOffensive";
import OffensiveCard from "./OffensiveCard";
import styles from "./Offensives.module.css";

const Offensives = () => {
	const user = useAuthValue();

	const {
		documents: offensives,
		loading,
		error,
	} = useFetchDocuments("offensives", user.uid);

	const { setOffensive, response: setResponse } = useSetOffensive("offensives");

	const { deleteDocument, response: delResponse } =
		useDeleteDocument("offensives");

	const deleteOffensiveHandler = (id) => {
		deleteDocument(id);
	};

	const setOffensiveHandler = (offensive) => {
		setOffensive(offensive);
	};

	if (loading) {
		return <p>Carregando...</p>;
	}

	return (
		<main>
			<div className="container">
				<h1>Acompanhe suas ofensivas</h1>
				{offensives && offensives.length === 0 ? (
					<p>
						Você ainda não tem nenhuma ofensiva.{" "}
						<Link to="/offensives/create">Crie já</Link>
					</p>
				) : (
					<>
						<p>Veja todas as suas ofensivas</p>
						<ul className={styles.list}>
							{offensives &&
								offensives.map((offensive) => (
									<OffensiveCard
										offensive={offensive}
										key={offensive.id}
										deleteOffensiveHandler={deleteOffensiveHandler}
										setOffensiveHandler={setOffensiveHandler}
									/>
								))}
						</ul>
					</>
				)}
				{delResponse.error && <p className="error">{delResponse.error}</p>}
				{setResponse.error && <p className="error">{setResponse.error}</p>}
				{offensives && offensives.length > 0 && (
					<p>
						Crie ainda mais ofensivas!{" "}
						<Link to="/offensives/create">Clicando aqui!</Link>
					</p>
				)}
			</div>
		</main>
	);
};

export default Offensives;
