const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
  const { nome, email, tel, peso, sabor, data, hora } = req.body;
  let user = 'contato_igor@yahoo.com';
  let pass = '1@54i756';
  var transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    service: 'Yahoo',
    auth: { user, pass },
  });

  var mailOptions = {
    from: user,
    to: email,
    subject: 'encomenda de bolo',
    text: `ola ${nome}, você fez uma encomenda de bolo de ${sabor} e de ${peso}kg para entregar dia ${data} as ${hora}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('errado');
      console.log(error);
    } else {
      console.log('email enviado: ' + info.response);
    }
  });
  res.redirect('/obrigada');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
