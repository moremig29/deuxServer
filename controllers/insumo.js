const { response } = require('express');
const Insumo = require('../models/Insumo');

// registrar insumo
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbInsumo = new Insumo( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbInsumo.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbInsumo
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

// obtener todos los registros
const getInsumo = async ( req, resp = response ) => {

  const dbInsumo = await Insumo.find().sort({desc: 1});

  try {
    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de insumo',
      insumo: dbInsumo
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
  getInsumo
}