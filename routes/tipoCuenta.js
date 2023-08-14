const { Router } = require('express');
const { getTipoCuenta, crear } = require('../controllers/tipoCuenta');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getTipoCuenta );
router.post( '/', validarJWT, crear );

module.exports = router;