const { Router } = require('express');
const { crear, getMensajes, getMensaje } = require('../controllers/mensaje');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post( '/', validarJWT, crear );
router.get( '/', validarJWT, getMensajes );
router.get( '/:id', validarJWT, getMensaje );

module.exports = router;