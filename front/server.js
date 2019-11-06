const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/food-front'));

app.listen(process.env.PORT || 8080);

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/dist/food-front/index.html'));
})

console.log('Express server listening!');