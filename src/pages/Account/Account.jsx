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
	const {
		logout,
		error,
		loading,
		updateDisplayName,
		verifyEmail,
		changePassword,
	} = useAuthentication();
	const [displayName, setDisplayName] = useState("");
	const [passControl, setPassControl] = useState({
		actualPass: "",
		newPass: "",
		confirmNewPass: "",
	});
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

	const changeInputPass = (e) => {
		const old = passControl;
		old[e.target.name] = e.target.value;
		setPassControl({ ...old });
	};
	const handleChangePasswod = async (e) => {
		e.preventDefault();
		if (passControl.actualPass == passControl.newPass) {
			setMessage("A nova senha não pode ser igual a senha atual.");
			return;
		} else if (passControl.newPass != passControl.confirmNewPass) {
			setMessage("As senhas não coincidem.");
			return;
		}
		await changePassword(
			{ email: user.email, password: passControl.actualPass },
			passControl.newPass
		);
		if (!error) {
			setMessage("Senha Alterada!");
			setPassControl({ actualPass: "", newPass: "", confirmNewPass: "" });
		}
	};

	const handleConfirmLogout = () => {
		setShowModal(true);
		setModalInfo({
			title: "Sair",
			content: "Tem certeza que você deseja sair?",
			btn: "Sair",
			func: logout,
		});
	};

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
						<form className={styles.controlForm} onSubmit={handleChangePasswod}>
							<label>
								<span>Digite sua senha atual: </span>
								<input
									type="password"
									required
									name="actualPass"
									value={passControl.actualPass}
									onChange={changeInputPass}
								/>
							</label>
							<label>
								<span>Digite sua nova senha: </span>
								<input
									type="password"
									required
									name="newPass"
									value={passControl.newPass}
									onChange={changeInputPass}
								/>
							</label>
							<label>
								<span>Confirme sua nova senha: </span>
								<input
									type="password"
									required
									name="confirmNewPass"
									value={passControl.confirmNewPass}
									onChange={changeInputPass}
								/>
							</label>
							<button className="btn" disabled={loading}>
								Alterar
							</button>
						</form>
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
