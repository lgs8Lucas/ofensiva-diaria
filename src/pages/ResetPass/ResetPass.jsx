import React, { useState } from "react";
import styles from "./ResetPass.module.css"
import { Link } from "react-router-dom";

const ResetPass = () => {
	const [email, setEmail] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }
	return (
		<main className={styles.reset}>
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
                <button className="btn">Solicitar redefinição</button>
                <Link to={"/login"} className="btn btn-dark">Fazer login</Link>
			</form>
		</main>
	);
};

export default ResetPass;
