const { response } = require('express');
const Paypal = require('../models/Paypal');

// crear usuario
const crearPaypal = async ( req, resp = response ) => {

  try {

    const uid = req.uid;
    const body = req.body;

    // crear usuario con el modelo
    let dbPaypal = new Paypal({
      usuario: uid,
      ...body });

    //crear usuario de db
    await dbPaypal.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const verPaypals = async ( req, resp = response ) => {

  const uid = req.uid;

  const [ dbPaypals, dbTotal ] = await Promise.all([
    Paypal.find({ 'usuario': uid })
          .sort({fecha: -1})
          .limit(10),
    Paypal.countDocuments()
  ]);

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      dbTotal,
      Paypal: dbPaypals
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

const verPaypal = async ( req, resp = response ) => {

  const { id } = req.body;

  const dbPaypal = await Paypal.findById( id );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de compras',
      Paypal: dbPaypal
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }


}

const editarPaypal = async ( req, resp = response ) => {

  const id = req.params.id;

  const cambiosPaypal = {  
    ...req.body 
  }

  const paypalActualizado = await Paypal.findByIdAndUpdate( id, cambiosPaypal, { new: true } );

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Editado satisfactoriamente',
      paypal: paypalActualizado
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo actualizar'
    });

  }
}

const borrarPaypal = async ( req, resp = response ) => {

  const id = req.params.id;

  try {
    const dbPaypalEliminado = await Paypal.findByIdAndDelete( id );

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Paypal Eliminada',
      dbPaypal: dbPaypalEliminado
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo eliminar'
    });
  }
}

const verTotalPaypals = async ( req, resp = response ) => {

  const dbPaypals = await Paypal.find();

  try {

    let income = 0;
    let outcome = 0;
  
    dbPaypals.forEach(element => {
      if ( element.tipo === 1 ) {
        income += element.monto
      } else {
        outcome += element.monto
      }
    });
  
    let totalEnCuenta = income - outcome; 

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Total disponible',
      total: totalEnCuenta
    });
    
  } catch (error) {
    
    return resp.status(500).json({
      ok: false,
      msg: 'No se puede realizar la cuenta'
    });
  }


}

const actualizarMasivo = async (req, resp = response) => {

  const uid = req.uid;
  const paypalDb = await Paypal.find();

  for await (const item of paypalDb ) {

    let id = item.id;
    item.usuario = uid;

    const actualizado = await Paypal.findByIdAndUpdate(id, item, { new: true } );
  }

  return resp.status(201).json({
    ok: true,
    msg: 'actualizado',
    paypalDb
  })

}

module.exports = {
  crearPaypal,
  verPaypals,
  verPaypal,
  editarPaypal,
  borrarPaypal,
  verTotalPaypals,
  actualizarMasivo
}