const express = require('express');
const path = require('path');
const { usuario, pessoa } = require('./models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function(req, res){
  var pessoas = await pessoa.findAll();
  res.render('index', { pessoas });
})

app.get('/pessoas/cadastrar', async function(req, res){
  var pessoas = await pessoa.findAll();
  res.render('pessoas/cadastrar', { pessoas });
})

//Adicionando
app.post('/pessoas/adicionar', async function(req, res){
  try {
      await pessoa.create(req.body);
      res.redirect('/')
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
  }
})

//Deletando
app.get('/pessoas/deletar', async function(req, res){
  try {
      await pessoa.destroy({ where: { id: req.query.id } });
      res.redirect('/')
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao deletar a pessoa.' });
  }
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});