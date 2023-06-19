const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/static');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

app.get('/encomenda', (req, res) => {
  res.sendFile(path.resolve('views/encomenda.html'));
});

app.get('/obrigada', (req, res) => {
  res.sendFile(path.resolve('views/agradecimento.html'));
});
app.post('/', (req, res) => {
  const { nome } = req.body;
  console.log(nome);
  res.redirect('/obrigada');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
