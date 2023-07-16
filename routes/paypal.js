const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearPaypal, verPaypals, verPaypal, editarPaypal, borrarPaypal, verTotalPaypals } = require('../controllers/paypal');

const router = Router();


// read all
router.get( '/', verPaypals )

// Create
router.post( '/crearPaypal',[
  check( 'monto', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'fecha', 'La fecha es obligatoria' ).not().isEmpty(),
  validarCampos
], crearPaypal );

// read One
router.post( '/verPaypal',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], verPaypal );

// update
router.put( '/:id',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  check( 'monto', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'fecha', 'La fecha es obligatoria' ).not().isEmpty(),
  validarCampos
], editarPaypal );

// delete
router.delete( '/:id',[
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], borrarPaypal );

//obtener total guardado
router.get( '/verTotalPaypals', verTotalPaypals)

module.exports = router;