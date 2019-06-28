// importando o model post
const Post = require('../models/Post')

module.exports = {
    // configurar upload dos dados (desistruração)
    async store(req, res) {
        //pegando registro do post no db
        const post = await Post.findById(req.params.id);

        post.likes += 1;;

        await post.save();

        //habilitando a var io para comunicar uma mudança (registro) no backend para todos os usuarios conectados
        req.io.emit('like', post);

        return res.json(post);
    }
};