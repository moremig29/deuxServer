const { Router } = require('express');
const { crear, getCuenta } = require('../controllers/cuenta');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCuenta );
router.post( '/', validarJWT, crear );

module.exports = router;