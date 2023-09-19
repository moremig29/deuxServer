const { Router } = require('express');
const { crear, getCliente, putCliente, deleteCliente } = require('../controllers/cliente');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCliente );
router.post( '/', validarJWT, crear );
router.put( '/:id', validarJWT, putCliente );
router.delete( '/:id', validarJWT, deleteCliente );

module.exports = router;