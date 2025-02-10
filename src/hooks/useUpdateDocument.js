import { useEffect, useState, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const initialState = { loading: null, error: null };

const updateReducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return { ...initialState, loading: true };
		case "ERROR":
			return { loading: false, error: action.payload };
		case "UPDATED_DOC":
			return { ...initialState, loading: false };
		default:
			return state;
	}
};

export const useUpdateDocument = (docCollection) => {
	const [response, dispatch] = useReducer(updateReducer, initialState);

	//deal with memory leak
	const [cancelled, setCancelled] = useState(false);

	const checkCancelBeforeDispatch = (action) => {
		if (!cancelled) {
			dispatch(action);
		}
	};

	const updateDocument = async (docId, data) => {
		checkCancelBeforeDispatch({ type: "LOADING" });
		try {
			const updatedDoc = await updateDoc(doc(db, docCollection, docId), data);
			checkCancelBeforeDispatch({ type: "UPDATED_DOC", payload: updatedDoc });
		} catch (error) {
			checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
		}
	};

	useEffect(() => {
		return () => {
			setCancelled(true);
		};
	}, []);

	return { updateDocument, response };
};
