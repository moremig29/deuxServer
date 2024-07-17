const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarApiKey = async ( req, res = response, next ) => {

  const key = req.header('X-Api-Key');

  if( !key ) {
    return res.status(401).json({
      ok: false,
      msg: 'unauthorized: none api key present'
    });
  }

  try {

    //const dbUser = await Usuario.find

    const { client, secret } = jwt.verify( key, process.env.SECRET_JWT_SEED );

    const user = await Usuario.where({secret: secret})
                              .where({client: client})

    if (user) {
      req.uid = user._id;
      req.name = user.name;
    }
    else {
      return res.status(401).json({
      ok: false,
      msg: 'unauthorized: user not found'
    });
    }
    
  } catch (error) {
    
    return res.status(401).json({
      ok: false,
      msg: 'unvalid key'
    });
  }

  // ok
  next();
}

module.exports = {
  validarApiKey
}