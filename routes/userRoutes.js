const express = require('express');
const router = express.Router();

const Controle = require('./../controllers/userController');

const ControleLogin = require('./../controllers/loginController');



router.get('/', ControleLogin.MostraLogin);
router.post('/', ControleLogin.FazLogin);
router.get('/sair', ControleLogin.Deslogar);

router.get('/home', Controle.Home);
router.get('/historico', Controle.Historico);
router.post('/historico', Controle.Historico);

router.get('/doencas', Controle.Doencas);



module.exports = router;






