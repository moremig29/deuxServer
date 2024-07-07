const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarApiKey = async ( req, res = response, next ) => {

  const key = req.header('x-api-key');

  if( !key ) {
    return res.status(401).json({
      ok: false,
      msg: 'unauthorized'
    });
  }

  try {

    //const dbUser = await Usuario.find

    const { client, secret } = jwt.verify( key, process.env.SECRET_JWT_SEED );

    console.log( 'helper:', client, secret )

    const user = await Usuario.where({secret: secret})
                              .where({client: client})

    if (user) {
      console.log( user )
      req.uid = user._id;
      req.name = user.name;
    }
    else {
      return res.status(401).json({
      ok: false,
      msg: 'unauthorized'
    });
    }
    
  } catch (error) {
    
    return res.status(401).json({
      ok: false,
      msg: 'token no valido'
    });
  }

  // ok
  next();
}

module.exports = {
  validarApiKey
}