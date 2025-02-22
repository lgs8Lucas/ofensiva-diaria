import React, { useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import AccountSection from "./AccountSection";
import {
	faDoorOpen,
	faEnvelope,
	faKey,
	faLock,
	faMessage,
	faPassport,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Account.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Account = () => {
	const user = useAuthValue();
	const { logout, error, loading, updateDisplayName } = useAuthentication();
	const [displayName, setDisplayName] = useState("");

	const handleChangeName = async (e) => {
		e.preventDefault();
		await updateDisplayName(displayName);
		if (!error) {
			window.location.reload();
		}
	};

	return (
		<main className={`${styles.configAccount}`}>
			<h1>Configurações de conta</h1>
			{error && (
				<div className="error mb-2">
					<p>{error}</p>
				</div>
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
				<AccountSection icon={faKey} title={"Alterar senha"}>
					<p>Em desenvolvimento...</p>
				</AccountSection>
				<AccountSection icon={faEnvelope} title={"Alterar Email"}>
					<p>Em desenvolvimento...</p>
				</AccountSection>
				<li>
					<button className={styles.logout} onClick={logout}>
						<FontAwesomeIcon icon={faDoorOpen} />
						<span>Sair</span>
					</button>
				</li>
			</ul>
		</main>
	);
};

export default Account;
