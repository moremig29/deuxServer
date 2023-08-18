const { Router } = require('express');
const { crear, getCliente } = require('../controllers/cliente');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCliente );
router.post( '/', validarJWT, crear );

module.exports = router;