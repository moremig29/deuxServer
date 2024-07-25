const { Router } = require('express');
const { createApiKey, getApikey, deleteApiKey } = require('../controllers/apikey');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post( '/', validarJWT, createApiKey );
router.get( '/', validarJWT, getApikey );
router.delete( '/:id', validarJWT, deleteApiKey );

module.exports = router;