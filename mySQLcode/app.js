// GET ALL DEPENDENCIES
const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// DECLARE CONNECTION CREDENTIALS FOR MYSQL
const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'join_us'
});
// Establish connection with mySQL on computer
connection.connect();


app.get("/", function(req, res) {
	//Find count of users in DB
	let q = 'SELECT COUNT(*) AS count FROM users'
	connection.query(q, function(error, results, fields) {
		if (error) throw error;
		let count = results[0].count;
		res.render("home", {counter: count});
	});
});

app.post('/register', function(req, res) {
	var person = {
		email: req.body.email
	};
	connection.query('INSERT INTO users SET ?', person, function(error, results, fields) {
		if (error) throw error;
		res.redirect("/");
	});
});




app.listen(3000, function() {
	console.log('App listening on port 3000!');
});







// // Terminate connection with mySQL on computer
// connection.end();

