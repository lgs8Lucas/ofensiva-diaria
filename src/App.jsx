import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Offensives from "./pages/Offensives/Offensives";
import CreateOffensives from "./pages/Offensives/CreateOffensives";
import EditOffensive from "./pages/Offensives/EditOffensive";
import ResetPass from "./pages/ResetPass/ResetPass";
import Account from "./pages/Account/Account";

function App() {
	const [user, setUser] = useState(undefined);
	const { auth } = useAuthentication();

	const loadingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, [auth]);

	if (loadingUser) {
		return <p>Carregando...</p>;
	}

	return (
		<div id="app">
			<AuthProvider value={user}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/*" element={<Home />} />
						<Route
							path="/login"
							element={!user ? <Login /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/register"
							element={!user ? <Register /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/reset-pass"
							element={!user ? <ResetPass /> : <Navigate to={"/"} />}
						/>
						<Route
							path="/offensives"
							element={user ? <Offensives /> : <Navigate to={"/login"} />}
						/>
						<Route
							path="/offensives/edit/:id"
							element={user ? <EditOffensive /> : <Navigate to={"/login"} />}
						/>
						<Route
							path="/offensives/create"
							element={user ? <CreateOffensives /> : <Navigate to={"/login"} />}
						/>
						<Route
							path="/account"
							element={user ? <Account /> : <Navigate to={"/login"} />}
						/>
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
