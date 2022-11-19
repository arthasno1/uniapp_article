'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const { id } = event
	console.log(id)
	const collection = await db.collection("article").doc(id).get()
	return collection
};
