import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";
import styles from "./Offensives.module.css";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditOffensive = () => {
	const { id } = useParams();
	const user = useAuthValue();
	const { updateDocument: updateOffensive, response } =
		useUpdateDocument("offensives");

	const {
		document: oldOffensive,
		loading: loadingOldOffensive,
		error: fetchError,
	} = useFetchDocument("offensives", id);

	const navigate = useNavigate();
	if (oldOffensive && user.uid !== oldOffensive.uid) {
		navigate("/offensives");
	}

	const [goal, setGoal] = useState("");
	const [type, setType] = useState("marking");
	const [legend, setLegend] = useState("");

	useEffect(() => {
		if (!oldOffensive) return;
		setGoal(oldOffensive.goal);
		setType(oldOffensive.type);
		setLegend(oldOffensive?.legend);
        
	}, [oldOffensive]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let newOffensive = {};
		if (oldOffensive) {
			newOffensive = { ...oldOffensive };
		}
		newOffensive.goal = goal;
		newOffensive.type = type;
		newOffensive.legend = legend;
		if (oldOffensive && type !== oldOffensive.type) {
			if (type === "marking") newOffensive.lastUpdate = new Date();
			newOffensive.startCount = new Date();
		}
		updateOffensive(id, newOffensive);
		if (!response.error) {
			navigate("/offensives");
		}
	};

	return (
		<main>
			<main>
				<form onSubmit={handleSubmit}>
					<h1>Alterando a meta diária</h1>
					{loadingOldOffensive && (
						<p className="loading">Carregando dados...</p>
					)}
					<label>
						<span>Meta:</span>
						<input
							type="text"
							name="goal"
							required
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
						/>
					</label>
					<label>
						<span>Tipo de ofensiva</span>
						<select
							name="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option value="marking">Ofensiva de marcação</option>
							<option value="interruption">Ofensiva de interrupção</option>
						</select>
					</label>
					<label>
						<span>Legenda</span>
						<textarea
							name="legend"
							value={legend}
							onChange={(e) => setLegend(e.target.value)}
						></textarea>
					</label>
					<button className="btn mr-2" disabled={response.loading}>
						{response.loading ? "Editando..." : "Editar"}
					</button>
					<Link className="btn btn-dark" to={"/offensives"}>
						Voltar
					</Link>
					{response.error && <p className="error">{response.error}</p>}
				</form>
				<div className={styles.guide}>
					<p>Alterar o tipo de uma ofensiva fará com que ela seja resetada</p>
					<p>
						Na <strong>Ofensiva de marcação</strong>, todos os dias que você
						realizar a sua meta você deve marcar no site para somar no contador.
					</p>
					<p>
						Já na <strong>Ofensiva de interrupção</strong> automáticamente em 24
						horas ela será marcada, quando você acabar descumprindo a sua meta
						você deve interrompe-la.
					</p>
				</div>
			</main>
		</main>
	);
};

export default EditOffensive;
