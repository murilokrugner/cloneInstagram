//importar multer
const multer = require('multer');

// importar path (lidar com caminhos)
const path = require('path');

//configurando multer para salvar as imagens
module.exports = {
    storage: new multer.diskStorage({    //diskStorage salva as imagens na propria maquina
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb) {  //colocar nome original da imagem
            cb(null, file.originalname);
        }
    })
};