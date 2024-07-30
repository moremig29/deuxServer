const { response } = require('express');
const Apikey = require('../models/Apikey');
const { generarApiKEY } = require('../helpers/jwt');

// registrar compra
const createApiKey = async ( req, resp = response ) => {

  const uid = req.uid
  const name = req.name

  //TODO: VAlidate if the user has a created key
  
  try {
    
    const key = await generarApiKEY( uid, name )

    const DBApikey = new Apikey({
      ...key,
      user: uid
    })

    await DBApikey.save();

    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      key: DBApikey
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
    
    const [ dbApikey ] = await Apikey.find({ user: uid });

    if( dbApikey ) {

      return resp.status(201).json({
        ok: true,
        msg: 'ok',
        key: dbApikey
      });
    } else {
      return resp.status(200).json({
        ok: true,
        msg: 'apiKey no configurada',
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