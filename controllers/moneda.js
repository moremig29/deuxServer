const { response } = require('express');
const Moneda = require('../models/Moneda');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbMoneda = new Moneda( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbMoneda.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbMoneda
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getMoneda = async ( req, resp = response ) => {

  const dbMoneda = await Moneda.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de moneda',
      moneda: dbMoneda
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
  getMoneda
}