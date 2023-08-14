const { Router } = require('express');
const { getEstatus, crear } = require('../controllers/estatus');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getEstatus );
router.post( '/', validarJWT, crear );

module.exports = router;