const { Router } = require('express');
const { postCuenta, getCuenta, getCuentaByType } = require('../controllers/cuenta');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCuenta );
router.post( '/', validarJWT, postCuenta );
router.get( '/cuentaByType', validarJWT, getCuentaByType );

module.exports = router;