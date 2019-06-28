// usando http e websockets para comunicação

// importa o express
const express = require ('express');

//import mongoose
const mongoose = require('mongoose')

// importando o path
const path = require('path');

//importando o cors
const cors = require('cors');

// criar o app
const app = express();

//configurando Web Socket
const server = require('http').Server(app);

//habilitando web socket  (aplicação suportar o web socket)
const io = require('socket.io')(server);

//conectando banco
mongoose.connect('mongodb+srv://semana:semana@cluster0-wguwt.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//criando midweres do io para habilitar a comunicação de algum registro no backend
app.use((req, res, next) => {
    req.io = io;
    
    //para garantir que a aplicação nao pare no io
    next();
});

//configurando o cors para que o frontend acesse o backend mesmo em dominios diferentes
app.use(cors());

//configurando caminhao para o frontend
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//caminho para as rotas
app.use(require('./routes'));

//informa a porta do navegador (esta usando o server do websockets)
server.listen(3333);  

