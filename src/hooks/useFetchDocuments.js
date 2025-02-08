import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import {
	collection,
	query,
	orderBy,
	onSnapshot,
	where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, uid, search = null) => {
	const [documents, setDocuments] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	//deal with memory leak
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		async function loadData() {
			if (cancelled) return;
			setLoading(true);

			const collectionRef = await collection(db, docCollection);

			try {
				const q = await query(
					collectionRef,
					where("uid", "==", uid, search, orderBy("createdAt", "desc"))
				);
                
				await onSnapshot(q, (querySnapshot) => {
                    //Sempre que alterar pega novos dados
					setDocuments(
						querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					);
				});
				setLoading(false);
			} catch (error) {
                console.log(error);
                
				setError(error.message);
				setLoading(false);
			}
		}
		loadData();
	}, [docCollection, search, uid, cancelled]);

	useEffect(() => {
		return () => {
			setCancelled(true);
		};
	}, []);

	return { documents, loading, error };
};
