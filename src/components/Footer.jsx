import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<h1>Ofensiva Diária</h1>
			<p>Um site para você criar metas diárias e acompanha-las!</p>
			<hr />
			<p>
				Criado por{" "}
				<a href="https://www.linkedin.com/in/lucas-silva-tech/" target="_blank">
					Lucas Gonçalves
				</a>
				, acompanhe mais projetos no meu{" "}
				<a href="https://github.com/lgs8Lucas" target="_blank">
					GitHub
				</a>
				!
			</p>
		</footer>
	);
};

export default Footer;
