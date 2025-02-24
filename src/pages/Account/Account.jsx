import React, { useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import AccountSection from "./AccountSection";
import {
	faDoorOpen,
	faEnvelope,
	faKey,
	faTrash,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Account.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";
import { createPortal } from "react-dom";

const Account = () => {
	const user = useAuthValue();
	const { logout, error, loading, updateDisplayName, verifyEmail } =
		useAuthentication();
	const [displayName, setDisplayName] = useState("");
	const [message, setMessage] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [modalInfo, setModalInfo] = useState({
		title: "",
		content: "",
		func: () => {},
		bnt: "",
	});

	const handleChangeName = async (e) => {
		e.preventDefault();
		await updateDisplayName(displayName);
		if (!error) {
			window.location.reload();
		}
	};

	const handleConfirmLogout = () =>{
		setShowModal(true)
		setModalInfo({
			title: "Sair",
			content: "Tem certeza que você deseja sair?",
			btn:"Sair",
			func: logout
		})
	}

	return (
		<main className={`${styles.configAccount}`}>
			<h1>Configurações da conta</h1>
			{error ? (
				<div className="error mb-2">
					<p>{error}</p>
				</div>
			) : (
				message && (
					<div className="message mb-2">
						<p>{message}</p>
					</div>
				)
			)}
			<ul className={styles.menus}>
				<AccountSection icon={faUser} title={"Alterar nome de usuário"}>
					<form className={styles.controlForm} onSubmit={handleChangeName}>
						<label>
							<span>Novo nome de usuário:</span>
							<input
								type="text"
								required
								value={displayName}
								onChange={(e) => setDisplayName(e.target.value)}
							/>
						</label>
						<button className="btn" disabled={loading}>
							Alterar
						</button>
					</form>
				</AccountSection>
				{!user.emailVerified ? (
					<AccountSection icon={faEnvelope} title={"Confirmar Email"}>
						<p>
							Seu email {user.email} ainda não foi ativado{" "}
							<button
								className="btnLink"
								onClick={(_) => {
									verifyEmail();
									if (!error) {
										setMessage("Email para ativação enviado!");
									}
								}}
								disabled={loading}
							>
								ative já.
							</button>
						</p>
					</AccountSection>
				) : (
					<AccountSection icon={faKey} title={"Alterar senha"}>
						<p>Em desenvolvimento...</p>
					</AccountSection>
				)}
				<AccountSection icon={faEnvelope} title={"Alterar Email"}>
					<p>Em desenvolvimento...</p>
				</AccountSection>
				<AccountSection icon={faTrash} title={"Excluir conta"}>
					<p>Em desenvolvimento...</p>
				</AccountSection>
				<li>
					<button className={styles.logout} onClick={handleConfirmLogout}>
						<FontAwesomeIcon icon={faDoorOpen} />
						<span>Sair</span>
					</button>
				</li>
			</ul>
			{showModal &&
				createPortal(
					<Modal onClose={(_) => setShowModal(false)} {...modalInfo} />,
					document.body
				)}
		</main>
	);
};

export default Account;
