'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let { detail, picurl } = event
	db.collection("article").add({
		postTime: Date.now(),
		...detail,
		picurl: picurl
	})
};
