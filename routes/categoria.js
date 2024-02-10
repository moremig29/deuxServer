const { Router } = require('express');
const { postCategoria, getCategoria } = require('../controllers/categoria');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getCategoria );
router.post( '/', validarJWT, postCategoria );

module.exports = router;