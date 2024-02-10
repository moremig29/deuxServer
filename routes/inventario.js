const { Router } = require('express');
const { getInventario, postInventario, putInventario, deleteInventario, getLowInventario } = require('../controllers/inventario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getInventario );
router.post( '/', validarJWT, postInventario );
router.put('/:id', validarJWT, putInventario );
router.delete('/:id', validarJWT, deleteInventario );
router.get('/lowInventario', validarJWT, getLowInventario)

module.exports = router;