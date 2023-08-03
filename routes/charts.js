const { Router } = require('express');
const { gastosTotales } = require('../controllers/charts');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// read all
router.get( '/gastosTotales', validarJWT, gastosTotales )

module.exports = router;