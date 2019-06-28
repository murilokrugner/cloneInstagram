// importando o model post
const Post = require('../models/Post')

// importando sharp
const sharp = require('sharp');

// importando path
const path = require('path');;

// importando file system
const fs = require('fs');

module.exports = {
    // retorna todos os posts da aplicação com data de criação mais recente primeiro
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    // configurar upload dos dados (desistruração)
    async store(req, res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file;

        //nome da imagem mais .jpg que é a extenção (convertendo imagem para jpg (bem loca essa logica))
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //redencionamento da imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        //apagando imagem original
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //habilitando a var io para comunicar uma mudança (registro) no backendpara todos os usuarios conectados
        req.io.emit('post', post);
        
        return res.json(post);
    }
};