const { response } = require('express');
const Mensaje = require('../models/Mensaje');

// registrar compra
const crear = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbMensaje = new Mensaje( {
      user: uid,
      ...req.body
    });

    //crear usuario de db
    await dbMensaje.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbMensaje
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getMensajes = async (req, resp = response ) => {

  const uid = req.uid
  try {
    
    const dbMensajes = await Mensaje.where({ user: uid });

    if( dbMensajes.length > 0 ) {

      return resp.status(201).json({
        ok: true,
        msg: 'ok',
        mensajes: dbMensajes
      });
    } else {
      return resp.status(200).json({
        ok: true,
        msg: 'Sin mensajes para mostrar',
      });
    }


  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'Error en la consulta'
    });

  }

}

const getMensaje = async ( req, resp = response ) => {

  const uid = req.uid;

  const dbMensaje = await Moneda.where({ user: uid });

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de moneda',
      mensaje: dbMensaje
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
  getMensajes,
  getMensaje
}