import React from "react";
import styles from "./OffensiveCard.module.css";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const OffensiveCard = ({
	offensive,
	deleteOffensiveHandler,
	setOffensiveHandler,
}) => {
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
		const notReset =
			(new Date().setHours(0, 0, 0, 0) -
				new Date(offensive.lastUpdate.seconds * 1000).setHours(0, 0, 0, 0)) /
				86400000 <=
			1;
		strike = notReset ? (last - start) / 86400000 + 1 : 0;
		hasOffensive = last === now;
	} else {
		strike = now - start;
		strike = strike / 86400000;
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
					<button
						className="btn"
						onClick={(_) => setOffensiveHandler(offensive)}
						disabled={hasOffensive}
					>
						<FontAwesomeIcon icon={faCheck} />
					</button>
				) : (
					<button
						className="btn btn-dark btn-danger"
						onClick={(_) => setOffensiveHandler(offensive)}
						disabled={!hasOffensive}
					>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				)}
				<button className="btn btn-dark">
					<FontAwesomeIcon icon={faPen} />
				</button>
				<button
					className="btn btn-dark btn-danger"
					onClick={(_) => deleteOffensiveHandler(offensive.id)}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</li>
	);
};

export default OffensiveCard;
