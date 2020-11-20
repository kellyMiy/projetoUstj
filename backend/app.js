const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Tarefa = require('./models/tarefa');

mongoose.connect('mongodb+srv://user_base:senha_user@cluster0.69cnq.mongodb.net/app-mean?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log("Conexão ok")
    }).catch((err) => {
        console.log("Sem conexão");
        console.log(err);
    });


app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(':D');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/tarefas', (req, res, next) => {
    Tarefa.find().then((tarefas) => {
        res.status(200).json({ mensagem: 'Tarefas consultadas com sucesso', tarefas: tarefas });
    });
})

app.post('/api/tarefas', (req, res, next) => {
    const tarefa = new Tarefa({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        dataConclusao: req.body.dataConclusao,
        dataCadastro: req.body.dataCadastro
    });
    
    tarefa.save((err, doc) => {
        res.status(201).json({ mensagem: 'Tarefa inserido com sucesso!', id: tarefa._id });
    });
});

app.put('/api/tarefas/:id', (req, res, next) => {
    const tarefa = new Tarefa({
        _id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        dataCadastro: req.body.dataCadastro,
        dataConclusao: req.body.dataConclusao
    });
    Tarefa.updateOne({_id: req.params.id}, tarefa).then(()=>{
        res.status(200).json({mensagem: 'Atualização realizada com sucesso!'});
    });
    
});

app.delete('/api/tarefas/:id', (req, res, next) => {
    console.log(req.params);
    Tarefa.findByIdAndDelete(req.params.id, (err, doc) => {
        res.status(200).end();
    });
});

module.exports = app;