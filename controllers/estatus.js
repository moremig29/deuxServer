const { response } = require('express');
const Estatus = require('../models/Estatus');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbEstatus = new Estatus( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbEstatus.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbEstatus
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getEstatus = async ( req, resp = response ) => {

  const dbEstatus = await Estatus.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de estatus',
      estatus: dbEstatus
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
  getEstatus
}