const mongoose = require('mongoose')

//criando tabela do banco
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true, //createAt, UpdateAt - data da ultima criação e alteração
});

module.exports = mongoose.model('Post', PostSchema);