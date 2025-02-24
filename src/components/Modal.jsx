import React from "react";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, title, content, func, btn }) => {
	return (
		<div className={styles.modalBase}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<h1>{title}</h1>{" "}
					<button onClick={onClose}>
						<FontAwesomeIcon icon={faClose} />
					</button>
				</div>
				<div className={styles.body}>
					<p>{content}</p>
					<button className="btn btn-dark mr-2"
						onClick={() => {
							onClose();
							func();
						}}
					>
						{btn}
					</button>
                    <button className="btn btn-dark" onClick={onClose}>Cancelar</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
