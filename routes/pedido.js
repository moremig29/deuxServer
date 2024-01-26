const { Router } = require('express');
const { postPedido, getPedido, putPedido, deletePedido } = require('../controllers/pedido');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getPedido );
router.post( '/', validarJWT, postPedido );
router.put('/:id', validarJWT, putPedido );
router.delete('/:id', validarJWT, deletePedido );

module.exports = router;