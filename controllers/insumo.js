const { response } = require('express');
const Insumo = require('../models/Insumo');

// registrar insumo
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbInsumo = new Insumo( {
      user: uid,
      ...req.body
    });

    //crear usuario de db
    await dbInsumo.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      data: dbInsumo
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

  const uid = req.uid;

  const dbInsumo = await Insumo.where({ user: uid })
                                .populate('categoria', 'nombre')
                                .sort({nombre: 1});

  try {
    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de insumo',
      data: dbInsumo
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

// editar insumo
const putInsumo = async ( req, resp = response ) => {

  const id = req.params.id;
  const insumo = req.body;
  const dbInsumo = await Insumo.findByIdAndUpdate( id, insumo, { new: true } );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Insumo editado',
      data: dbInsumo
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede editar'
    });

  }
}

// delete insumo
const deleteInsumo = async ( req, resp = response ) => {

  const id = req.params.id;
  const dbInsumo = await Insumo.findByIdAndDelete( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Insumo Eliminado',
      data: dbInsumo
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
  getInsumo,
  putInsumo,
  deleteInsumo
}