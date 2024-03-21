const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const codeModel = require('./database'); 
require("dotenv").config(); // Don't forget to call the config function

const mongoose = require('mongoose');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const uri = "mongodb+srv://Jamstreet0987:Jamstreet0987@siddhant.vk7ohjd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true // Add this line to avoid deprecation warning
}).then(() => {
  console.log('DB connection successful');
}).catch((error) => {
  console.log('DB connection failed:', error);
});

function insert(username, codeLang, stdin, codeText) {
  const textCode = new codeModel({
    username: username, // Corrected the field name from 'name' to 'username'
    codingLan: codeLang,
    stdin: stdin,
    code: codeText,
  });

  textCode.save()
    .then(doc => {
      console.log(doc)
      console.log("has been inserted")
    })
    .catch(error => {
      console.log("Error occurred:", error)
    });
}

async function getAllusers() {
  try {
    const userData = await codeModel.find();
    return userData;
  } catch (error) {
    console.log("Error occurred while fetching movie stores:", error);
    return [];
  }
}

app.listen(8080, () => {
  console.log('server is listening at 8080');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/page1', (req, res) => {
  res.sendFile(path.join(__dirname, 'page1.html'));
});

app.get('/page2',(req, res) => {
  res.sendFile(path.join(__dirname, 'page2.html'));
});


app.get('/load-data', async (req, res) => {
  try {
    const data = await getAllusers();
    res.json(data);
  } catch (error) {
    console.log("Error occurred while fetching user data:", error);
    res.status(500).send("Internal server error");
  }
});



app.post('/submit', (req, res) => {
  let user = req.body;
  let username = user.username;
  let codeLanguage = user.codeLanguage;
  let sourceCode = user.sourceCode;
  let stdin = user.stdin;
  insert(username, codeLanguage, stdin, sourceCode);
  res.json({ message: 'Data received successfully!' });
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  res.json(users);
});
