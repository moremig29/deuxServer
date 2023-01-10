const { Router } = require('express');
const { check } = require('express-validator');
const { crearCompra, verCompra, verCompras, editarCompra, borrarCompra } = require('../controllers/compras');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// read all
router.get( '/', verCompras )

// Create
router.post( '/crearCompra',[
  check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'ammount', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'date', 'La fecha es obligatoria' ).not().isEmpty(),
  check( 'status', 'El estatus es obligatorio' ).not().isEmpty(),
  validarCampos
], crearCompra );

// read One
router.post( '/verCompra',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], verCompra );

// update
router.post( '/actualizarCompra',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], editarCompra );

// delete
router.post( '/eliminarCompra',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], borrarCompra );

module.exports = router;