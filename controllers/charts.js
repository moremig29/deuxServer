const { response } = require('express');
const Gasto = require('../models/Gasto');

// registrar compra
const gastosTotales = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    let dbGastos = await Gasto.find();

    let data = {
      ingreso: 0,
      alimentacion: 0,
      transporte: 0,
      salud: 0,
      educacion: 0,
      deportes: 0,
      compras: 0,
      otros: 0
    }
    
    for (const gasto of dbGastos) {
      
      if ( gasto.type === 8 ) {
        data.ingreso += Math.round( gasto.ammount );
      }
      if ( gasto.type === 1 ) {
        data.alimentacion += Math.round( gasto.ammount );
      }
      if ( gasto.type === 2 ) {
        data.transporte += Math.round( gasto.ammount );
      }
      if ( gasto.type === 3 ) {
        data.salud += Math.round( gasto.ammount );
      }
      if ( gasto.type === 4 ) {
        data.educacion += Math.round( gasto.ammount );
      }
      if ( gasto.type === 5 ) {
        data.deportes += Math.round( gasto.ammount );
      }
      if ( gasto.type === 6 ) {
        data.compras +=  Math.round( gasto.ammount );
      }
      if ( gasto.type === 7 ) {
        data.otros +=  Math.round( gasto.ammount );
      }
    }

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      uid,
      data,
      dbGastos
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });
  }
}


module.exports = {
  gastosTotales
}