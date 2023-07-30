const { Router } = require('express');
const { check } = require('express-validator');
const { crearGasto, verGastos, verGasto, editarGasto, borrarGasto, totalGasto } = require('../controllers/gastos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// read all
router.get( '/', validarJWT,verGastos )

// Create
router.post( '/crearGasto',[
  validarJWT,
  check( 'description', 'La descripcion es obligatoria' ).not().isEmpty(),
  check( 'ammount', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'date', 'La fecha es obligatoria' ).not().isEmpty(),
  check( 'type', 'El estatus es obligatorio' ).not().isEmpty(),
  validarCampos
], crearGasto );

// read One
router.post( '/verGasto',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], verGasto );

// update
router.post( '/:id',[
  validarJWT,
  check( 'description', 'La descripcion es obligatoria' ).not().isEmpty(),
  check( 'ammount', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'date', 'La fecha es obligatoria' ).not().isEmpty(),
  check( 'type', 'El estatus es obligatorio' ).not().isEmpty(),
  validarCampos
], editarGasto );

// delete
router.delete( '/:id',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], borrarGasto );

// total gastos
router.get( '/totalGasto', validarJWT, totalGasto )

module.exports = router;