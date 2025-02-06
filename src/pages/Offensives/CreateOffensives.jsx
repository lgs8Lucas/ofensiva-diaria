import React, { useState } from "react";
import styles from "./Offensives.module.css";
import { Link } from "react-router-dom";

const CreateOffensives = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
        let lastUpdate = new Date()
        const startCount = new Date()

		const offensive = {
			goal,
			type,
			legend,
            startCount,
            lastUpdate,
		};
		console.log(offensive);
	};

	const [goal, setGoal] = useState("");
	const [type, setType] = useState("marking");
	const [legend, setLegend] = useState("");

	return (
		<main>
			<form onSubmit={handleSubmit}>
				<h1>Crie sua meta diária</h1>
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
				<button className="btn mr-2">Criar</button>
				<Link className="btn btn-dark" to={"/offensives"}>
					Voltar
				</Link>
			</form>
			<div className={styles.guide}>
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
	);
};

export default CreateOffensives;
