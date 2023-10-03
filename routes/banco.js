const { Router } = require('express');
const { getBancos, postBanco } = require('../controllers/banco');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getBancos );
router.post( '/', validarJWT, postBanco );

module.exports = router;