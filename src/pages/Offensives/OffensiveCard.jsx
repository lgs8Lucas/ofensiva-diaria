import React from "react";
import styles from "./OffensiveCard.module.css";

const OffensiveCard = ({ offensive }) => {
	let strike = 0;
	const now = new Date().setHours(0, 0, 0, 0);
	let hasOffensive = null;
	const start = new Date(offensive.startCount.seconds * 1000).setHours(
		0,
		0,
		0,
		0
	);
	if (offensive.type === "marking") {
		const last = new Date(offensive.lastUpdate.seconds * 1000).setHours(
			0,
			0,
			0,
			0
		);
		strike = last - start + 1;
		hasOffensive = last === now;
	} else {
		strike = now - start;
		hasOffensive = strike > 0;
	}
	return (
		<li className={styles.card}>
			<span
				className={`${styles.offensive} ${hasOffensive ? styles.active : ""}`}
			>
				{strike}
			</span>
			<span className={styles.goal}>{offensive.goal}</span>
			<div className={styles.actions}>
				{offensive.type === "marking" ? (
					<button className="btn">Marcar</button>
				) : (
					<button className="btn btn-dark btn-danger">interromper</button>
				)}
				<button className="btn btn-dark">Editar</button>
				<button className="btn btn-dark btn-danger">Remover</button>
			</div>
		</li>
	);
};

export default OffensiveCard;
