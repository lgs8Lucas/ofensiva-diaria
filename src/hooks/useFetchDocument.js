import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
	const [document, setDocument] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	//deal with memory leak
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		async function loadData() {
			if (cancelled) return;
			setLoading(true);
			try {
				const docRef = await doc(db, docCollection, id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setDocument({ ...docSnap.data(), id: docSnap.id });
				} else {
					setError("Ofensiva não encontrada!");
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setError(error.message);
				setLoading(false);
			}
		}
		loadData();
	}, [docCollection, id, cancelled]);

	useEffect(() => {
		return () => {
			setCancelled(true);
		};
	}, []);

	return { document, loading, error };
};
