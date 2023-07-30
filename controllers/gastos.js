const { response } = require('express');
const Gasto = require('../models/Gasto');

// crear usuario
const crearGasto = async ( req, resp = response ) => {

  const { descripcion, monto, fecha, tipo } = req.body;

  try {

    // crear usuario con el modelo
    let dbGasto = new Gasto( req.body );

    //crear usuario de db
    await dbGasto.save();

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

const verGastos = async ( req, resp = response ) => {

  const dbGastos = await Gasto.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de gastos',
      gastos: dbGastos
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const verGasto = async ( req, resp = response ) => {

  const { id } = req.body;

  const dbGasto = await Gasto.findById( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de compras',
      compras: dbGasto
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }


}

const editarGasto = async ( req, resp = response ) => {

  const id = req.params.id;

  const cambiosGasto = {  
    ...req.body 
  }

  const gastoActualizado = await Gasto.findByIdAndUpdate( id, cambiosGasto, { new: true } );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'editada',
      gasto: gastoActualizado
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const borrarGasto = async ( req, resp = response ) => {

  const id = req.params.id;

  const dbGastoEliminado = await Gasto.findByIdAndDelete( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Gasto Eliminada',
      dbGasto: dbGastoEliminado
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const totalGasto = async ( req, resp = response ) => {

  const dbGastos = await Gasto.find();
  
  let totalGastos = 0;
  let ingreso = 0

  dbGastos.forEach( element => {
    
    if( element.type === 8 ) {

      ingreso += element.ammount
    } else {

      totalGastos += Number(element.ammount);
    }


  });

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      totalGastos,
      ingreso
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo procesar'
    });

  }

}

module.exports = {
  crearGasto,
  verGastos,
  verGasto,
  editarGasto,
  borrarGasto,
  totalGasto
}