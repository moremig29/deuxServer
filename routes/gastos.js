const { Router } = require('express');
const { check } = require('express-validator');
const { crearGasto, verGastos, verGasto, editarGasto, borrarGasto } = require('../controllers/gastos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// read all
router.get( '/', verGastos )

// Create
router.post( '/crearGasto',[
  check( 'descripcion', 'La descripcion es obligatoria' ).not().isEmpty(),
  check( 'monto', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'fecha', 'La fecha es obligatoria' ).not().isEmpty(),
  check( 'tipo', 'El estatus es obligatorio' ).not().isEmpty(),
  validarCampos
], crearGasto );

// read One
router.post( '/verGasto',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], verGasto );

// update
router.post( '/:id',[
  check( 'descripcion', 'La descripcion es obligatoria' ).not().isEmpty(),
  check( 'monto', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'fecha', 'La fecha es obligatoria' ).not().isEmpty(),
  check( 'tipo', 'El estatus es obligatorio' ).not().isEmpty(),
  validarCampos
], editarGasto );

// delete
router.delete( '/:id',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], borrarGasto );

module.exports = router;