import React from "react";
import { useAuthValue } from "../../context/AuthContext";
import AccountSection from "./AccountSection";
import { faDoorOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Account.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Account = () => {
	const user = useAuthValue();
	const { logout } = useAuthentication();
	return (
		<main className={`${styles.configAccount}`}>
			<h1>Configurações de conta</h1>
			<div className={styles.menus}>
				<AccountSection icon={faUser} title={"Alterar nome de usuário"} >
                    <p>teste</p>
                </AccountSection>
				<button className={styles.logout} onClick={logout}>
					<FontAwesomeIcon icon={faDoorOpen} />
					<span>Sair</span>
				</button>
			</div>
		</main>
	);
};

export default Account;
