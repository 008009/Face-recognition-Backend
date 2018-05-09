const registerHandler =(req, res, db, bcrypt)=>{
	const { name, email, password } = req.body;
	if(!name || !email || !password) {
		return res.status(400).json('Invalid Form Submission');
	}
	const hash = bcrypt.hashSync(password, 10);
	db.transaction(trx => {
		trx('login').insert({
			hash: hash,
			email:email
		})
		.returning('email')
		.then(loginEmail =>{
			//To figue out return
			return trx('users')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.returning('*')
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	registerHandler:registerHandler 
}