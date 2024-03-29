const { response } = require('express');
//const Precio = require('../models/Precio');
const Inventario = require('../models/Inventario')
const Producto = require('../models/Producto')

// obtener Precios
const getPrecio = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

  const dbPrecio = await Producto.find({ 'user': uid })

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Lista de precios',
      precios: dbPrecio
    });
    
  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

module.exports = {
  getPrecio
}