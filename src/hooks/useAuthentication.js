import { db } from "../firebase/config";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	sendPasswordResetEmail,
	sendEmailVerification,
	reauthenticateWithCredential,
	updatePassword,
	EmailAuthProvider,
} from "firebase/auth"; //Pegando funções do Firebase

import { useState, useEffect } from "react";

export const useAuthentication = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	// Cleanup
	// Deal with memory leak
	const [canceled, setCanceled] = useState(false);
	const auth = getAuth();

	function checkIfIsCancelled() {
		if (canceled) return;
	}

	//Register
	const createUser = async (data) => {
		checkIfIsCancelled();
		setLoading(true);
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			); //Cria usuário com login e senha
			await updateProfile(user, { displayName: data.name }); //Define username do usuário
			setLoading(false);
			setError(null);
			return user;
		} catch (er) {
			let systemErrorMessage;
			if (er.message.includes("Password"))
				systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
			else if (er.message.includes("email-already"))
				systemErrorMessage = "Este email já está cadastrado";
			else systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
			setError(systemErrorMessage);
		}
		setLoading(false);
	};

	//Logout
	const logout = () => {
		checkIfIsCancelled();
		signOut(auth);
	};

	//Login
	const login = async (data) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
		} catch (er) {
			let systemErrorMessage;
			if (er.message.includes("invalid-credential"))
				systemErrorMessage = "Verifique seu email e senha e tente novamente!";
			else systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
			setError(systemErrorMessage);
		}
		setLoading(false);
	};

	//Request a new Pass
	const requestNewPass = async (email) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			setError("Ocorreu um erro, por favor tente mais tarde");
		}
		setLoading(false);
	};

	//Change update display name
	const updateDisplayName = async (displayName) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		try {
			await updateProfile(auth.currentUser, { displayName });
		} catch (error) {
			setError(
				"Ocorreu um erro ao alterar o nome de usuário, por favor tente mais tarde."
			);
		}
		setLoading(false);
	};

	//Verify email
	const verifyEmail = async () => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		try {
			await sendEmailVerification(auth.currentUser);
		} catch (error) {
			setError(
				"Ocorreu um erro ao enviar o email de confirmação, verifique seu email e tente novamente mais tarde."
			);
		}
		setLoading(false);
	};

	//Re-authentication
	const reAuthentication = async (credentialData) => {
		try {
			const credential = EmailAuthProvider.credential(
				credentialData.email,
				credentialData.password
			);

			await reauthenticateWithCredential(auth.currentUser, credential);
			return true;
		} catch (error) {
			setError(
				"Ocorreu um erro, verifique sua senha e tente novamente mais tarde."
			);
			return false;
		}
	};

	//ChangePassword
	const changePassword = async (credential, newPassword) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		const logged = await reAuthentication(credential);
		if (!logged) return;
		try {
			await updatePassword(auth.currentUser, newPassword);
		} catch (error) {
			console.log(error);

			setError("Erro ao alterar a senha, tente novamente mais tarde.");
		}
		setLoading(false);
	};

	useEffect(() => {
		return () => setCanceled(true);
	}, []);

	return {
		auth,
		createUser,
		error,
		loading,
		logout,
		login,
		requestNewPass,
		updateDisplayName,
		verifyEmail,
		changePassword,
	};
};
