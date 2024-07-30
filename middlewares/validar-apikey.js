const { response } = require("express");
const jwt = require('jsonwebtoken');
const Apikey = require('../models/Apikey');

const validarApiKey = async ( req, res = response, next ) => {

  const key = req.header('X-Api-Key');

  console.log( key )

  if( !key ) {
    return res.status(401).json({
      ok: false,
      msg: 'unauthorized: none api key present'
    });
  }

  try {

    //const dbUser = await Usuario.find

    console.log('inicia el try')

    //const { client, secret } = jwt.verify( key, process.env.SECRET_JWT_SEED);

    //console.log( client, secret )

    const bdUser = await Apikey.where({apiKey: key})

    // const user = await Apikey.where({secret: secret})
    //                           .where({client: client})

    console.log(bdUser)
    
    if (bdUser) {
      req.uid = bdUser.user;
    }
    else {
      return res.status(401).json({
      ok: false,
      msg: 'unauthorized: user not found'
    });
    }
    
  } catch (error) {

    console.error(error)
    
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