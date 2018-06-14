const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//APP config
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Routes
app.get('/', (req, res) => {
  res.render('index')
})

//Port
app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
