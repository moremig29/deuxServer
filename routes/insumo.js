const { Router } = require('express');
const { getInsumo, crear, putInsumo, deleteInsumo } = require('../controllers/insumo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getInsumo );
router.post( '/', validarJWT, crear );
router.put('/:id', validarJWT, putInsumo );
router.delete('/:id', validarJWT, deleteInsumo );

module.exports = router;