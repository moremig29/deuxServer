const { Router } = require('express');
const { postPedido, getPedido } = require('../controllers/pedido');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getPedido );
router.post( '/', validarJWT, postPedido );

module.exports = router;