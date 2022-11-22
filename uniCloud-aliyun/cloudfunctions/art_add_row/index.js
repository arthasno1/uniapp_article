'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let { detail, picurl } = event
	return await db.collection("article").add({ postTime: Date.now(), ...detail, picurl: picurl })
}
