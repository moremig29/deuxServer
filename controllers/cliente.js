const { response } = require('express');
const Cliente = require('../models/Cliente');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbCliente = new Cliente( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbCliente.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbCliente
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getCliente = async ( req, resp = response ) => {

  const dbCliente = await Cliente.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de cliente',
      cliente: dbCliente
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
  getCliente
}