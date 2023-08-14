const { response } = require('express');
const TipoCuenta = require('../models/TipoCuenta');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbTipoCuenta = new TipoCuenta( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbTipoCuenta.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbTipoCuenta
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getTipoCuenta = async ( req, resp = response ) => {

  const dbTipoCuenta = await TipoCuenta.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de TipoCuenta',
      tipoCuenta: dbTipoCuenta
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
} 

module.exports = {
  crear,
  getTipoCuenta
}