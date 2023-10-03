const { response } = require('express');
const Banco = require('../models/Banco');

// registrar compra
const postBanco = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbBanco = new Banco( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbBanco.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      banco: dbBanco
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getBancos = async ( req, resp = response ) => {

  const dbBancos = await Banco.find();

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de bancos',
      bancos: dbBancos
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
} 

module.exports = {
  postBanco,
  getBancos
}