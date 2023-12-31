const { response } = require('express');
const Cuenta = require('../models/Cuenta');

// registrar compra
const postCuenta = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbCuenta = new Cuenta( {
      usuario: uid,
      ...req.body
    });

    //crear usuario de db
    await dbCuenta.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      dbCuenta
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getCuenta = async ( req, resp = response ) => {

  const dbCuenta = await Cuenta.find()
                                .populate('banco', 'banco')
                                .populate('moneda', 'desc')
                                .populate('tipoTransac', 'desc')
                                .populate('tipoCuenta', 'desc');

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de cuenta',
      cuenta: dbCuenta
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
} 

module.exports = {
  postCuenta,
  getCuenta
}