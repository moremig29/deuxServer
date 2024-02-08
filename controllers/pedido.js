const { response } = require('express');
const Pedido = require('../models/Pedido');

// registrar compra
const postPedido = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbPedido = new Pedido( {
      user: uid,
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

  const uid = req.uid;

  const dbPedido = await Pedido.where({ 'user': uid })
                                .populate('estatus', 'desc')
                                .populate('cliente', 'nombre')
                                .populate('items.articulo', 'nombre');

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

const putPedido = async ( req, res = response ) => {

  const id = req.params.id;
  const pedido = req.body;
  const dbPedido = await Pedido.findByIdAndUpdate( id, pedido, { new: true } );

  try {

    // generar response
    return res.status(200).json({
      ok: true,
      msg: 'Pedido editado',
      dbPedido
    });
    
  } catch (error) {

    return res.status(500).json({
      ok: false,
      msg: 'No se puede editar'
    });

  }
}

const deletePedido = async ( req, res = response ) => {

  const id = req.params.id;
  const dbPedido = await Pedido.findByIdAndDelete( id );

  try {

    // generar response
    return res.status(200).json({
      ok: true,
      msg: 'Pedido Eliminado',
      dbPedido
    });
    
  } catch (error) {

    return res.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

module.exports = {
  postPedido,
  getPedido,
  putPedido,
  deletePedido
}