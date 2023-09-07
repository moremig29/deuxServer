const { response } = require('express');
const Cliente = require('../models/Cliente');

const getCuentaCliente = async ( req, resp = response ) => {

  const cantidadClientes = await Cliente.countDocuments();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de cliente',
      clientes: cantidadClientes
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
} 

module.exports = {
  getCuentaCliente
}