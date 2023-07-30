const { Router } = require('express');
const { check } = require('express-validator');
const { crearCompra, verCompra, verCompras, editarCompra, borrarCompra, totalCompra } = require('../controllers/compras');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// read all
router.get( '/', validarJWT, verCompras )

// Create
router.post( '/crearCompra',[
  validarJWT,
  check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'ammount', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'date', 'La fecha es obligatoria' ).not().isEmpty(),
  check( 'status', 'El estatus es obligatorio' ).not().isEmpty(),
  validarCampos
], crearCompra );

// read One
router.post( '/verCompra',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], verCompra );

// update
router.post( '/actualizarCompra',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], editarCompra );

// delete
router.post( '/eliminarCompra',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], borrarCompra );

// suma total
router.get( '/totalCompra', validarJWT, totalCompra );

module.exports = router;