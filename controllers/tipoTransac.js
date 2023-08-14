const { response } = require('express');
const TipoTransac = require('../models/TipoTransac');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbTipoTransac = new TipoTransac( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbTipoTransac.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbTipoTransac
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getTipoTransac = async ( req, resp = response ) => {

  const dbTipoTransac = await TipoTransac.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de TipoTransac',
      TipoTransac: dbTipoTransac
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
  getTipoTransac
}