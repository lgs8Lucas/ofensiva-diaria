import { useUpdateDocument } from "./useUpdateDocument";

export const useSetOffensive = (docCollection) => {
	const { updateDocument, response } = useUpdateDocument(docCollection);
	const markOffensive = (offensive) => {
		const data = { ...offensive };
		const notReset =
			(new Date().setHours(0, 0, 0, 0) -
				new Date(offensive.lastUpdate.seconds * 1000).setHours(0, 0, 0, 0)) /
				86400000 <=
			1;
		if (!notReset) data.startCount = new Date();
		data.lastUpdate = new Date();
		updateDocument(offensive.id, data);
	};

	const interruptOffensive = (offensive) => {
		const data = { ...offensive };
		data.startCount = new Date();
		updateDocument(offensive.id, data);
	};
	const setOffensive = (offensive) => {
		if (offensive.type === "marking") {
			markOffensive(offensive);
		} else {
			interruptOffensive(offensive);
		}
	};
	return { setOffensive, response };
};
