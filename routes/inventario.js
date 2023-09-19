const { Router } = require('express');
const { getInventario, postInventario, putInventario, deleteInventario } = require('../controllers/inventario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getInventario );
router.post( '/', validarJWT, postInventario );
router.put('/:id', validarJWT, putInventario );
router.delete('/:id', validarJWT, deleteInventario );

module.exports = router;