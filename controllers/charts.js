const { response } = require('express');
const Gasto = require('../models/Gasto');

// registrar compra
const gastosTotales = async ( req, resp = response ) => {


  const uid = req.uid;

  try {

    let dbGastos = await Gasto.find();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      uid,
      dbGastos
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });
  }
}


module.exports = {
  gastosTotales
}