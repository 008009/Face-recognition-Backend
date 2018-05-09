const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c9f5b9ccd88a4c5db024b7d4535d7e70'
});

const imageUrlHandler = (req, res) =>{
	const {input} = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL,input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('API not working'))
}

module.exports = {
	imageUrlHandler: imageUrlHandler
}