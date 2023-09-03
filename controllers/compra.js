const { response } = require('express');
const Compra = require('../models/Compra');

// registrar compra
const crearCompra = async ( req, resp = response ) => {

  const uid = req.uid;

  console.log( uid );

  try {

    // crear usuario con el modelo
    let dbCompra = new Compra(req.body);

    //crear usuario de db
    await dbCompra.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
    });
    
  } catch (error) {

    console.log( error );

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}
// ver todas las compras registradas
const verCompras = async ( req, resp = response ) => {

  const uid = req.uid;
  const dbCompras = await Compra.find().populate('producto','desc');

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
// ver una compra
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
// editar una compra
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
// borrar una compra
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
// mostrar la suma total de las compras
const totalCompra = async ( req, resp = response ) => {

  const dbCompras = await Compra.find();
  
  let totalCompras = 0;

  dbCompras.forEach( element => {
    
    totalCompras += Number(element.ammount);

  });

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      totalCompras
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo procesar'
    });

  }

}

module.exports = {
  crearCompra,
  verCompra,
  verCompras,
  editarCompra,
  borrarCompra,
  totalCompra
}