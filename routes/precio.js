const { Router } = require('express');
const { getPrecio } = require('../controllers/precio');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getPrecio );

module.exports = router;