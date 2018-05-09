const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image')
const imageUrl = require('./controller/imageUrl')


const db = knex({
	client: 'pg',
  	connection: {
    	host : '127.0.0.1',
    	user : 'carl0809',
    	password : '',
    	database : 'smart-brain'
  	}
});
const app = express();
// middware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send('it is working');
})

// signin --> POST = success/fail
app.post('/signin', (req, res)=> {signin.signinHandler(req, res, db, bcrypt)})

//register -->POST = new user object
app.post('/register', (req,res)=> {register.registerHandler(req, res, db, bcrypt)})

//profile/:userId --->GET = user
app.get('/profile/:id', (req,res)=> {profile.profileHandler(req, res, db)})

//image --> PUT --> updatad user
app.put('/image', (req, res)=> {image.imageHandler(req, res, db)})

//imageUrl --> GET --> handle API call
app.post('/imageUrl', (req, res)=> {imageUrl.imageUrlHandler(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on ${process.env.PORT}`);
});

// app.listen(3000, ()=>{
// 	console.log(`app is running on 3000`);
// });
