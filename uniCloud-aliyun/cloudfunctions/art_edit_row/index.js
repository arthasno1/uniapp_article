'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let { detail, picurl } = event
	console.log(event)
	const collection = await db.collection('article').doc(detail
		._id).update({
		title: detail.title,
		author: detail.author,
		coutent: detail.coutent,
		picurl: picurl
	})
	return collection
};
