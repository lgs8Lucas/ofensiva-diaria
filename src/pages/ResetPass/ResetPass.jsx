import React, { useState } from "react";
import styles from "./ResetPass.module.css";
import { Link } from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";

const ResetPass = () => {
	const { requestNewPass, loading, error } = useAuthentication();
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		requestNewPass(email);
		if (!error) {
			setMessage("Email para redefinição de senha enviado.");
		} else {
			setMessage("");
		}
	};
	return (
		<main className={`textCenter ${styles.reset}`}>
			<h1>Redefina sua senha</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						required
						placeholder="Digite seu Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<button className="btn" disabled={loading}>
					Solicitar redefinição
				</button>
				<Link to={"/login"} className="btn btn-dark">
					Fazer login
				</Link>
				{error ? (
					<div className="error">
						<p>{error}</p>
					</div>
				) : (
					message && (
						<div className="message">
							<p>{message}</p>
						</div>
					)
				)}
			</form>
		</main>
	);
};

export default ResetPass;
