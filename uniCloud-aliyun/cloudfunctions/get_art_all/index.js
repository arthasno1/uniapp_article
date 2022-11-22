'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let { skip = 0 } = event
	const collection = await db.collection('article').limit(8).skip(skip).orderBy("postTime", "desc").get()
	return collection
};
