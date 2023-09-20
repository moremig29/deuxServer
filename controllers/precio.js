const { response } = require('express');
//const Precio = require('../models/Precio');
const Inventario = require('../models/Inventario')

// obtener Precios
const getPrecio = async ( req, resp = response ) => {

  try {

    const dbPrecio = await Inventario.find()
                                      .where('cantidad').gt(0)
                                      .populate('producto', 'precio_venta img rating' )
                                      .sort({articulo: 1});

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Lista de precios',
      precios: dbPrecio
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

module.exports = {
  getPrecio
}