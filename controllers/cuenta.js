const { response } = require('express');
const Cuenta = require('../models/Cuenta');

// registrar compra
const postCuenta = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbCuenta = new Cuenta( {
      user: uid,
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

  const uid = req.uid;

  try {

    const dbCuenta = await Cuenta.where({ 'user': uid })
                                .populate('banco', 'banco')
                                .populate('tipoTransac', 'desc')
                                .populate('tipoCuenta', 'desc')
                                .populate('moneda', 'desc simbolo')
                                .populate('cliente', 'nombre' )
                                .populate('pedido', 'estatus')
                                .sort({'fecha': -1 })

    // generar response
    return resp.status(200).json({
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

const getCuentaByType = async ( req, resp = response ) => {

  const uid = req.uid;

  let saldos = {
    bolEfectivo: 0,
    bolbanco: 0,
    dolEfectivo: 0,
    dolBanco: 0,
  }

  let cuentaBolEfectivo = await Cuenta.where({ 'user': uid })
                                .where('tipoCuenta').equals('64da5aa7ff830e89b92e70ae')
                                .where('moneda').equals('65abf67267eec91111400791');

  let cuentaBolBanco = await Cuenta.where({ 'user': uid })
                                .where('tipoCuenta').equals('64da5aa1ff830e89b92e70ac')
                                .where('moneda').equals('65abf67267eec91111400791')

  let cuentaDolEfectivo = await Cuenta.where({ 'user': uid })
                                .where('tipoCuenta').equals('64da5aa7ff830e89b92e70ae')
                                .where('moneda').equals('65abf65167eec9111140078f')

  let cuentaDolBanco = await Cuenta.where({ 'user': uid })
                                .where('tipoCuenta').equals('64da5aa1ff830e89b92e70ac')
                                .where('moneda').equals('65abf65167eec9111140078f')

  if( cuentaBolEfectivo.length > 0) {
    for (const cuenta of cuentaBolEfectivo) {
      if ( cuenta.tipoTransac._id == '64da5a45ff830e89b92e70a7' ) {
        saldos.bolEfectivo += cuenta.monto
      } else {
        saldos.bolEfectivo -= cuenta.monto
      }
    }
  }

  if( cuentaBolBanco.length > 0 ) {
    for (const cuenta of cuentaBolBanco) {
      if ( cuenta.tipoTransac._id == '64da5a45ff830e89b92e70a7' ) {
        saldos.bolbanco += cuenta.monto
      } else {
        saldos.bolbanco -= cuenta.monto
      }
    }
  }

  if( cuentaDolEfectivo.length > 0 ) {
    for (const cuenta of cuentaDolEfectivo) {
      if ( cuenta.tipoTransac._id == '64da5a45ff830e89b92e70a7' ) {
        saldos.dolEfectivo += cuenta.monto
      } else {
        saldos.dolEfectivo -= cuenta.monto
      }
    }
  }

  if( cuentaDolBanco.length > 0 ) {
    for (const cuenta of cuentaDolBanco) {
      if ( cuenta.tipoTransac._id == '64da5a45ff830e89b92e70a7' ) {
        saldos.dolBanco += cuenta.monto
      } else {
        saldos.dolBanco -= cuenta.monto
      }
    }
  }
  
  try {

  // generar response
    return resp.status(200).json({
      ok: true,
      msg: 'listado de cuenta',
      saldos
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
  getCuenta,
  getCuentaByType
}