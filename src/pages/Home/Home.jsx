import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
	return (
		<main className={styles.content}>
			<div className={`container`}>
				<h1>Bem-vindo ao Ofensiva Diária!</h1>
				<p>
					No Ofensiva Diária, acreditamos que pequenas{" "}
					<strong>metas diárias</strong> podem levar a grandes conquistas. Nosso
					objetivo é ajudar você a definir, acompanhar e realizar suas metas de
					maneira simples e eficiente.
				</p>

				<h2>🔥 Comece sua jornada agora mesmo!</h2>

				<ul>
					<li>Defina metas diárias personalizadas.</li>
					<li>Acompanhe seu progresso com ferramentas fáceis de usar.</li>
					<li>Seja mais produtivo e organizado.</li>
					<li>Alcance seus objetivos de maneira consistente.</li>
					<li>Celebre cada vitória, grande ou pequena.</li>
				</ul>
				<h2>❓ Como começar?</h2>
				<p>
					Para começar na ofensiva diária é simples, crie uma{" "}
					<Link to={"/offensives/create"}>meta clicando aqui</Link>, após isto
					basta acompanhar a sua meta e atualiza-la diáriamente na sua{" "}
					<Link to={"/offensives"}>lista de ofensivas.</Link>
				</p>
				<h2>😎 Quer participar do projeto?</h2>
				<p>
					Caso você tenha encontrado algum bug, ou tenha alguma ideia para o
					projeto, entre em contato com o desenvolvedor por{" "}
					<a href="mailto:lgs.08lucas@gmail.com?subject=Ajuda com o site ofensiva diária">
						email
					</a>
					!
				</p>
			</div>
		</main>
	);
};

export default Home;
