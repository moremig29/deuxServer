const { response } = require('express');
const Apikey = require('../models/Apikey');
const { generarApiKEY } = require('../helpers/jwt');

// registrar compra
const createApiKey = async ( req, resp = response ) => {

  console.log(' inicia la creacion')

  const uid = req.uid
  const name = req.name
  
  try {
    
    const key = await generarApiKEY( uid, name )

    console.log(key)

    const DBApikey = new Apikey({
      ...key,
      user: uid
    })
    console.log(DBApikey)

    await DBApikey.save();


    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      apikey: DBApikey
    });


  } catch (error) {
    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo generar su key'
    });
  }


}

const getApikey = async (req, resp = response ) => {

  const uid = req.uid

  try {
    
    const DBApikey = await Apikey.where({ user: uid });

    if( DBApikey.length > 0 ) {

      return resp.status(201).json({
        ok: true,
        msg: 'ok',
        DBApikey
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
      msg: 'No logramos obtener tu apikey'
    });

  }

}

const deleteApiKey = async ( req, resp = response ) => {

  const id = req.params.id;

  const dbApikey = await Apikey.findByIdAndDelete( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Apikey eliminada',
      apikey: dbApikey
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No logramos eliminar tu apikey'
    });

  }
} 

module.exports = {
  createApiKey,
  getApikey,
  deleteApiKey
}