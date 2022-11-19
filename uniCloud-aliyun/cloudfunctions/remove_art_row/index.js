'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let { id } = event
	const collection = await db.collection('article').doc(id)
		.remove()
	return collection
};
