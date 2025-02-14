import React, { useState } from "react";
import styles from "./OffensiveCard.module.css";
import { Link } from "react-router-dom";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faArrowUp,
	faCheck,
	faClose,
	faInfo,
	faPen,
	faSign,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons/faSignIn";

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

	const [show, setShow] = useState(false);

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
			<div className={styles.cardMain}>
				<span
					className={`${styles.offensive} ${hasOffensive ? styles.active : ""}`}
				>
					{strike}
				</span>
				<span className={styles.goal}>{offensive.goal}</span>
				<div className={styles.actions}>
					{offensive.legend && offensive.legend.length > 0 && (
						<button className="btn btn-dark" onClick={(_) => setShow(!show)}>
							<FontAwesomeIcon icon={faInfo} />
						</button>
					)}
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
					<Link
						className="btn btn-dark"
						to={`/offensives/edit/${offensive.id}`}
					>
						<FontAwesomeIcon icon={faPen} />
					</Link>
					<button
						className="btn btn-dark btn-danger"
						onClick={(_) => deleteOffensiveHandler(offensive.id)}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</div>
			{show && (
				<div className={styles.cardLegend}>
					<p>{offensive.legend}</p>
					<button className="btn btn-dark" onClick={(_) => setShow(!show)}>
						<FontAwesomeIcon icon={faClose} />
					</button>
				</div>
			)}
		</li>
	);
};

export default OffensiveCard;
