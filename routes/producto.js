const { Router } = require('express');
const { crear, getProductos, putProducto, deleteProducto } = require('../controllers/producto');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getProductos );
router.post( '/', validarJWT, crear );
router.put( '/:id', validarJWT, putProducto );
router.delete( '/:id', validarJWT, deleteProducto );

module.exports = router;