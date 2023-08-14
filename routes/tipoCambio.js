const { Router } = require('express');
const { getTipoCambio, crear } = require('../controllers/tipoCambio');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getTipoCambio );
router.post( '/', validarJWT, crear );

module.exports = router;