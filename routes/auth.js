const { Router } = require('express');
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//crear usuario
router.post( '/new',[
  check( 'name', 'el nombre es obligatorio' ).not().isEmpty(),
  check( 'email', 'el email es obligatorio' ).isEmail(),
  check( 'password', 'el password es obligatorio' ).isLength({ min: 6 }),
  validarCampos
], crearUsuario );

//login usuario
router.post( '/', [
  check( 'email', 'el email es obligatorio' ).isEmail(),
  check( 'password', 'el password es obligatorio' ).isLength({ min: 6 }),
  validarCampos
], loginUsuario );

//revalidar token
router.get( '/renew', validarJWT ,renovarToken );

module.exports = router;