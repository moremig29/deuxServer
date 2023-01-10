const { response } = require('express');
const Compra = require('../models/Compra');


// crear usuario
const crearCompra = async ( req, resp = response ) => {

  const { ammount, name, date, note, status } = req.body;

  try {

    // crear usuario con el modelo
    dbCompra = new Compra( req.body );

    //crear usuario de db
    await dbCompra.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const verCompras = async ( req, resp = response ) => {

  const dbCompras = await Compra.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de compras',
      compras: dbCompras
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const verCompra = async ( req, resp = response ) => {

  const { id } = req.body;

  const dbCompra = await Compra.findById( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de compras',
      compras: dbCompra
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }


}

const editarCompra = async ( req, resp = response ) => {

  const compra = new Compra( req.body );

  const dbCompra = await Compra.findByIdAndUpdate( compra.id, compra );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'editada',
      compras: dbCompra
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const borrarCompra = async ( req, resp = response ) => {

  const { id } = req.body;

  const dbCompra = await Compra.findByIdAndDelete( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Compra Eliminada',
      dbCompra: dbCompra
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

module.exports = {
  crearCompra,
  verCompra,
  verCompras,
  editarCompra,
  borrarCompra
}