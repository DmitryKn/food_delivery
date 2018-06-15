const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql')

// DB config
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "delivery"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

//APP config
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Routes
app.get('/', (req, res) => {
  res.render('index');
})

app.post('/response', (req, res)=>{
  var post =  req.body.response;
  var q = "INSERT INTO response SET?";
  con.query(q, post, (err, result) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/')
  })
  con.end();
})

app.get('/show',(req, res) => {
  var q = "SELECT * FROM response ORDER BY id DESC;"
  con.query(q, (err, result) =>{
    if(err) throw error;
    res.render('show', {result: result});
  })
  //con.end();
})

//Port
app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
