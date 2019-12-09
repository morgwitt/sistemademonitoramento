const express = require('express');
const router = express.Router();

const multer = require('multer');

const storageFunction = multer.diskStorage({
    destination: function (req, file, cb) {
     //cria a pasta do usuário caso nao exista usando o fs.
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

  var upload = multer({ storage: storageFunction });

const Controle = require('./../controllers/adminController');

const ControleLogin = require('./../controllers/loginController');


router.get('/admin/adm', Controle.MostraAdm);

router.get('/admin/adicionarUser', Controle.MostraAddUser);
router.post('/admin/adicionarUser', upload.array('images', 1), Controle.AddUser);

router.get('/admin/removerUser', Controle.MostraRemoverUser);
router.post('/admin/removerUser', Controle.RemoverUser);

module.exports = router;