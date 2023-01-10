const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

// crear usuario
const crearUsuario = async ( req, resp = response ) => {

  const { email, name, password } = req.body;

  try {

    // verificar si no existe el correo

    const usuario = await Usuario.findOne({ email });

    if ( usuario ) {
      return resp.status(400).json({
        ok: false,
        msg: 'Correo registrado'
      })
    }


    // crear usuario con el modelo
    dbUser = new Usuario( req.body );

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt );

    // generear el JWT
    const token = await generarJWT( dbUser.id, name );

    //crear usuario de db
    await dbUser.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      uid: dbUser.id,
      name,
      email,
      token
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'Comuniquese con el administrador'
    });

  }





}

const loginUsuario = async ( req, resp = response ) => {

  const { email, password } = req.body;

  try {

    const dbUser = await Usuario.findOne( { email } );

    if ( !dbUser ) {
      return resp.status(400).json({
        ok: false,
        msg: 'el correo no existe'
      });
    }
    
    // confirmar password 
    const validPassword = bcrypt.compareSync( password, dbUser.password );

    if( !validPassword ) {
      return resp.status(400).json({
        ok: false,
        msg: 'el password no es valido'
      });
    }

    // generear el JWT
    const token = await generarJWT( dbUser.id, dbUser.name );

    // respuesta

    return resp.json({
      ok: true,
      msg: 'login',
      uid: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      token
    })



  } catch (error) {

    console.log( error );

    return resp.status(500).json({
      ok: true,
      msg: 'Contacte al admin'
    });

  }


}

const renovarToken = async ( req, resp = response ) => {

  const { uid, name } = req;

  // leer de la db
  const dbUser = await Usuario.findById( uid );

  // generear el JWT
  const token = await generarJWT( uid, dbUser.name );

  return resp.json({
    ok: true,
    uid,
    name: dbUser.name,
    email: dbUser.email,
    token
  });
}


module.exports = {
  crearUsuario,
  loginUsuario,
  renovarToken
}