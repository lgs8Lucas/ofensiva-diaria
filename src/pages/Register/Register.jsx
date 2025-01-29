import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
const initialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Register = () => {
	const [form, setForm] = useState(initialState);
	const [error, setError] = useState("");

	const { createUser, error: authError, loading } = useAuthentication();

	const editForm = (e) => {
		const temp = form;
		temp[e.target.name] = e.target.value;
		setForm({ ...temp });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (form.password !== form.confirmPassword) {
			setError("As senhas não coincidem!");
			return;
		}
		const user = {
			name: form.name,
			email: form.email,
			password: form.password,
		};
		const res = await createUser(user);
		console.log(res);
	};

	useEffect(() => {
		if (authError) {
			setError(authError);
		}
	}, [authError]);

	return (
		<main className={styles.register}>
			<h1>Cadastre-se já!</h1>
			<p>
				Começe a planejar seu cronograma do dia a dia criando suas ofensivas
				diárias!
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Nome:</span>
					<input
						type="text"
						name="name"
						required
						placeholder="Digite seu nome"
						value={form.name}
						onChange={editForm}
					/>
				</label>
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
				<label>
					<span>Confirme sua Senha:</span>
					<input
						type="password"
						name="confirmPassword"
						required
						placeholder="Confirme sua Senha"
						value={form.confirmPassword}
						onChange={editForm}
						minLength={6}
					/>
				</label>
				<button className="btn" disabled={loading}>{loading?"Carregando...":"Cadastrar"}</button>
				{error ? (
					<div className="error">
						<p>{error}</p>
					</div>
				) : (
					""
				)}
			</form>
		</main>
	);
};

export default Register;
