const imageHandler = (req, res, db)=>{
	const { id, faceNumber, entries } = req.body;
	db('users').where('id', id).increment('entries', faceNumber)
	.returning('*')
	.then(user => {
		res.json(user[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	imageHandler:imageHandler
}