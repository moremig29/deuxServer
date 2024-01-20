const { response } = require('express');
const Cliente = require('../models/Cliente');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbCliente = new Cliente( {
      user: uid,
      ...req.body
    });

    //crear usuario de db
    await dbCliente.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: `Se ha creado ${dbCliente.nombre}`,
      cliente: dbCliente
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getCliente = async ( req, resp = response ) => {

  const uid = req.uid;

  const dbCliente = await Cliente.where({ 'user': uid })
                                  .sort({'nombre': 1});

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

const putCliente = async ( req, resp = response ) => {

  const id = req.params.id;
  const cliente = req.body;
  const dbCliente = await Cliente.findByIdAndUpdate( id, cliente, { new: true } );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: `Se ha modificado ${dbCliente.nombre}`,
      cliente: dbCliente
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede editar'
    });

  }
}

const deleteCliente = async ( req, resp = response ) => {

  const id = req.params.id;
  const dbCliente = await Cliente.findByIdAndDelete( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: `Se ha eliminado ${dbCliente.nombre}`,
      cliente: dbCliente
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo eliminar'
    });

  }
}

module.exports = {
  crear,
  getCliente,
  putCliente,
  deleteCliente
}