const { response } = require('express');
const Pedido = require('../models/Pedido');

// registrar compra
const postPedido = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbPedido = new Pedido( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbPedido.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Pedido creado',
      pedido: dbPedido
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });
  }

}

const getPedido = async ( req, resp = response ) => {

  const dbPedido = await Pedido.find()
                                .populate('estatus', 'desc')
                                .populate('cliente', 'nombre')
                                .populate('articulos.articulo', 'articulo');

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de pedidos',
      pedidos: dbPedido
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
} 

module.exports = {
  postPedido,
  getPedido
}