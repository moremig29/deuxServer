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

  const dbProducto = await Producto.find();

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

module.exports = {
  crear,
  getProductos
}