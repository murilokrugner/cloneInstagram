//importando express
const express = require('express');

//importar multer
const multer = require('multer');

//importando as configurações de upload da imagem
const uploadConfig = require('./config/upload');

//importar post controller
const PostController = require('./controllers/PostController');

//importando like controller
const LikeController = require('./controllers/LikeController');

//criar um routes
const routes = new express.Router();

//cadastrando o upload das imagens no multer
const upload = multer(uploadConfig);

//criando rota para get (buscar todas as informações no banco de dados)
routes.get('/posts', PostController.index);

//criando rota para posts (store é o metodo criado)
routes.post('/posts', upload.single('image'), PostController.store);

//rota para dar likes na foto
routes.post('/posts/:id/like', LikeController.store);


//exportando as rotas
module.exports = routes;