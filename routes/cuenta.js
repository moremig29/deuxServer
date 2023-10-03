const { Router } = require('express');
const { postCuenta, getCuenta } = require('../controllers/cuenta');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCuenta );
router.post( '/', validarJWT, postCuenta );

module.exports = router;