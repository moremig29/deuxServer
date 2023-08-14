const { Router } = require('express');
const { getTipoTransac, crear } = require('../controllers/tipoTransac');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getTipoTransac );
router.post( '/', validarJWT, crear );

module.exports = router;