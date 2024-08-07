const { response } = require('express');
const Cuenta = require('../models/Cuenta');
const PedidoCuenta = require('../models/PedidoCuenta');

// registrar compra
const postCuenta = async ( req, resp = response ) => {

  const uid = req.uid;
  const pedido = req.body.pedido;

  try {

    let dbCuenta = new Cuenta( {
      user: uid,
      ...req.body
    });

    await dbCuenta.save();

    if ( pedido ) {
      let pedidoCuenta = new PedidoCuenta({
        pedido: pedido,
        cuenta: dbCuenta._id
      })
      await pedidoCuenta.save()
    }

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

const postCuentaBalanceByMonth = async(req, resp = response ) => {

  const uid = req.uid;
  const selectedMonth = req.body.month;

  const moneda = ['65abf65167eec9111140078f','65abf67267eec91111400791']; // dolar, Bolivar
  const tipoTransac = ['64da5a45ff830e89b92e70a7','64da5a4dff830e89b92e70a9']; // ingreso, egreso

  let ingresoBs = 0;
  let ingresoDol = 0;
  let egresoBs = 0;
  let egresoDol = 0;

  
  try {
      const dbBalance = await Cuenta//.where({ 'user': uid })
                                    .aggregate([
                                      {$project: {
                                        desc: '$desc',
                                        monto: '$monto',
                                        moneda: '$moneda',
                                        transaccion: '$tipoTransac',
                                        month: {$month: '$fecha'}}},
                                      {$match: {month: selectedMonth}},
                                    ])
    
    dbBalance.forEach(element => {
      if( String(element.transaccion) === tipoTransac[0] ) {
        if ( String(element.moneda) === moneda[0] ) {
          ingresoDol += element.monto
        } else {
          ingresoBs += element.monto
        }
      } else {
        if ( String(element.moneda) === moneda[0] ) {
          egresoDol += element.monto
        } else {
          egresoBs += element.monto
        }
      }
    });

    let balance = {
      ingresoBs,
      ingresoDol,
      egresoBs,
      egresoDol
    }

  // generar response
    return resp.status(200).json({
      ok: true,
      msg: 'Balance del mes',
      balance
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'Sin balance para mostrar'
    });
  }
}

const putCuenta = async ( req, resp = response ) => {

  
  try {
    
    const id = req.params.id
    const cuenta = req.body
    const dbCuenta = await Cuenta.findByIdAndUpdate(id, cuenta, {new: true});
    

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Operación editada',
      dbCuenta
    });
    
  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo Editar'
    });

  }

}

const deleteCuenta = async ( req, resp = response ) => {

  try {

    const id = req.params.id;
    const dbCuenta = await Cuenta.findByIdAndDelete( id );

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Operacion Eliminada',
      dbCuenta
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo eliminar'
    });

  }

}

module.exports = {
  postCuenta,
  getCuenta,
  getCuentaByType,
  postCuentaBalanceByMonth,
  putCuenta,
  deleteCuenta
}