import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = { loading: null, error: null };

const deleteReducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return { ...initialState, loading: true };
		case "ERROR":
			return { loading: false, error: action.payload };
		case "DELETED_DOC":
			return { ...initialState, loading: false };
		default:
			return state;
	}
};

export const useDeleteDocument = (docCollection) => {
	const [response, dispatch] = useReducer(deleteReducer, initialState);

	// deal with memory leak
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {
		if (!cancelled) {
			dispatch(action);
		}
	};

	const deleteDocument = async (docId) => {
		checkCancelBeforeDispatch({ type: "LOADING" });
		try {
			const deletedDocument = await deleteDoc(doc(db, docCollection, docId));
			checkCancelBeforeDispatch({
				type: "DELETED_DOC",
				payload: deletedDocument,
			});
		} catch (error) {
			checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
		}
	};

	// memory leak
	useEffect(() => {
		return () => {
			setCancelled(true);
		};
	}, []);

	return { deleteDocument, response };
};
