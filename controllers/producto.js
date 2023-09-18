const { response } = require('express');
const Producto = require('../models/Producto');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbProducto = new Producto( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbProducto.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbProducto
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getProductos = async ( req, resp = response ) => {

  const dbProducto = await Producto.find().populate('insumos');

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de productos',
      productos: dbProducto
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const putProducto = async ( req, resp = response ) => {
  
  const id = req.params.id;
  const producto = req.body;
  const dbProducto = await Producto.findByIdAndUpdate( id, producto, { new: true } );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Producto editado',
      producto: dbProducto
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede editar'
    });

  }
}

const deleteProducto = async ( req, resp = response ) => {
  
  const id = req.params.id;
  const dbProducto = await Producto.findByIdAndDelete( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Producto Eliminado',
      producto: dbProducto
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
  getProductos,
  putProducto,
  deleteProducto
}