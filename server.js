const express = require('express');
const fs = require('fs');
const app = express();

let history = require('./history.json') || [];

function saveHistory(history) {
  fs.writeFileSync('history.json', JSON.stringify(history), {encoding: 'utf-8'});
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    fs.readFileSync('index.html', {encoding: 'utf-8'})
  );
});

app.get('/messeges', (req, res) => {
  res.send(history);
});

app.get('/messeges/:id', (req, res) => {
  console.log(req.params.id);
  res.send('Not found!');
});

app.delete('/messeges', (req, res) => {
  history = [];
  saveHistory(history);
  res.send(history);
});

// app.delete('/messeges/:id')

app.post('/messeges', (req, res) => {
  history.push(req.body);
  saveHistory(history);
  res.send(history);
});

app.listen(8080);