const { Router } = require('express');
const { postCuenta, getCuenta, getCuentaByType, putCuenta, deleteCuenta, postCuentaBalanceByMonth } = require('../controllers/cuenta');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCuenta );
router.post( '/', validarJWT, postCuenta );
router.get( '/cuentaByType', validarJWT, getCuentaByType );
router.post( '/cuentaBalanceByMonth', validarJWT, postCuentaBalanceByMonth );
router.put( '/:id', validarJWT, putCuenta );
router.delete( '/:id', validarJWT, deleteCuenta );

module.exports = router;