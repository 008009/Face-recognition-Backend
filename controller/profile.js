const profileHandler = (req, res, db)=>{
	const { id } = req.params;
	db('users').where('id', id)
	.then(user => {
		if(user.length === 1){
			res.json(user[0]);
		}else{
			res.status(400).json('not found');
		}
	})
	.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	profileHandler: profileHandler
}