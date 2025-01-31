import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Link } from "react-router-dom";

const initialState = {
	email: "",
	password: "",
};

const Login = () => {
	const [form, setForm] = useState(initialState);
	const [error, setError] = useState("");

	const { login, error: authError, loading } = useAuthentication();
	const editForm = (e) => {
		const temp = form;
		temp[e.target.name] = e.target.value;
		setForm({ ...temp });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const res = await login(form);
	};

	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);

	return (
		<main className={styles.login}>
			<h1>Faça seu login!</h1>
			<p>
				Começe a planejar seu cronograma do dia a dia criando suas ofensivas
				diárias!
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Email:</span>
					<input
						type="email"
						name="email"
						required
						placeholder="Digite seu Email"
						value={form.email}
						onChange={editForm}
					/>
				</label>
				<label>
					<span>Senha:</span>
					<input
						type="password"
						name="password"
						required
						placeholder="Digite sua Senha"
						value={form.password}
						onChange={editForm}
						minLength={6}
					/>
				</label>

				<button className="btn" disabled={loading}>
					{loading ? "Carregando..." : "Logar"}
				</button>
				{error ? (
					<div className="error">
						<p>{error}</p>
					</div>
				) : (
					""
				)}
				<p>
					Ainda não tem uma conta? <Link to={"/register"}>cadastre-se.</Link>
				</p>
			</form>
		</main>
	);
};

export default Login;
