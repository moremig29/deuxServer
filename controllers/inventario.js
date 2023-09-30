const { response } = require('express');
const Inventario = require('../models/Inventario');

// obtener Inventario
const getInventario = async ( req, resp = response ) => {

  try {

    const dbInventario = await Inventario.find()
                                          .populate('producto', 'id nombre precio_venta' )
                                          .sort({desc: 1});

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Inventario',
      inventario: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

// registrar articulo inventario
const postInventario = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbInventario = new Inventario( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbInventario.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Registrado',
      inventario: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }
}

// editar articulo Inventario
const putInventario = async ( req, resp = response ) => {

  const id = req.params.id;
  const inventario = req.body;
  
  try {
    const dbInventario = await Inventario.findByIdAndUpdate( id, inventario, { new: true } );
    
    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Inventario editado',
      insumo: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede editar'
    });

  }
}

// eliminar articulo inventario
const deleteInventario = async ( req, resp = response ) => {

  const id = req.params.id;
  
  try {
    const dbInventario = await Inventario.findByIdAndDelete( id );
    
    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Articulo inventario Eliminado',
      inventario: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

module.exports = {
  getInventario,
  postInventario,
  putInventario,
  deleteInventario
}