const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) => {

  const token = req.header('x-token');

  if( !token ) {
    return res.status(401).json({
      ok: false,
      msg: 'unauthorized'
    });
  }

  try {

    const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

    req.uid = uid;
    req.name = name;
    
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
  validarJWT
}