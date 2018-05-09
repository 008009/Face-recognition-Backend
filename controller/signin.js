const signinHandler = (req, res, db, bcrypt)=>{
	const { email, password } = req.body;
	if(!email || !password) {
		return res.status(400).json('Invalid Form Submission')
	}
	db('login').select('email', 'hash')
	.where('email', email)
	.then(data => {
		if(bcrypt.compareSync(password, data[0].hash)) {
			return db('users').select('*')
			.where('email', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('wrowng password');
		}
	})
	.catch(err => res.status(400).json('wrong password'));
}

module.exports = {
	signinHandler:signinHandler
}