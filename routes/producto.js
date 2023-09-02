const { Router } = require('express');
const { crear, getProductos } = require('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getProductos );
router.post( '/', validarJWT, crear );

module.exports = router;