const { response } = require('express');
//const Precio = require('../models/Precio');
const Inventario = require('../models/Inventario')

// obtener Precios
const getPrecio = async ( req, resp = response ) => {

  try {

    const dbPrecio = await Inventario.find()
                                      .where('cantidad').gt(0)
                                      .populate('producto', 'id nombre precio_venta img' )
                                      .sort({desc: 1});

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Inventario',
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