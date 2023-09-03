const { Router } = require('express');
const { getInsumo, crear } = require('../controllers/insumo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getInsumo );
router.post( '/', validarJWT, crear );

module.exports = router;