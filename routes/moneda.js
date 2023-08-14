const { Router } = require('express');
const { crear, getMoneda } = require('../controllers/moneda');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getMoneda );
router.post( '/', validarJWT, crear );

module.exports = router;