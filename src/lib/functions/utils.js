export const serializeNonPOJOs = (obj) => {
	// changed to use node 16 in vercel
  // return structuredClone(obj);
	return JSON.parse(JSON.stringify(obj));
};
