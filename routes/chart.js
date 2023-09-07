const { Router } = require('express');
const { getCuentaCliente } = require('../controllers/chart');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/totalClientes', validarJWT, getCuentaCliente );

module.exports = router;
