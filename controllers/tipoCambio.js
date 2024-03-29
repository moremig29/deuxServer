const { response } = require('express');
const TipoCambio = require('../models/TipoCambio');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbTipoCambio = new TipoCambio( {
      user: uid,
      ...req.body
    });

    //crear usuario de db
    await dbTipoCambio.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      tipoCambio: dbTipoCambio
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getTipoCambio = async ( req, resp = response ) => {

  const uid = req.uid;

  const dbTipoCambio = await TipoCambio.findOne({ 'user': uid })
                                        .sort( {createdAt: -1} );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de TipoCambio',
      tipoCambio: dbTipoCambio ? dbTipoCambio : []
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
  getTipoCambio
}