const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearPaypal, verPaypals, verPaypal, editarPaypal, borrarPaypal, verTotalPaypals, actualizarMasivo } = require('../controllers/paypal');

const router = Router();


// read all
router.get( '/', validarJWT, verPaypals );

// Create
router.post( '/crearPaypal',[
  validarJWT,
  check( 'monto', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'fecha', 'La fecha es obligatoria' ).not().isEmpty(),
  validarCampos
], crearPaypal );

// read One
router.post( '/verPaypal',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], verPaypal );

// update
router.put( '/:id',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  check( 'monto', 'El monto es obligatorio' ).not().isEmpty(),
  check( 'fecha', 'La fecha es obligatoria' ).not().isEmpty(),
  validarCampos
], editarPaypal );

// delete
router.delete( '/:id',[
  validarJWT,
  check( 'id', 'El id es obligatorio' ).not().isEmpty(),
  validarCampos
], borrarPaypal );

//obtener total guardado
router.get( '/verTotalPaypals', validarJWT, verTotalPaypals);

//actualizar masivo
//router.get('/actualizarMasivo', validarJWT, actualizarMasivo);


module.exports = router;