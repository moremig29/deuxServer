const { response } = require('express');
const Inventario = require('../models/Inventario');

// obtener Inventario
const getInventario = async ( req, resp = response ) => {

  const uid = req.uid;
  const month = new Date().getMonth()

  try {

    const dbInventario = await Inventario.where({ 'user': uid })
                                          .populate('insumo', 'nombre' )
                                          .sort({desc: 1});

    if (new Date(dbInventario[dbInventario.length -1].fecha).getMonth() !== month ){
      for await (const item of dbInventario) {
        let updateInventory = new Inventario({
          fecha: new Date().toString(),
          insumo: item.insumo._id,
          user: item.user,
          inicial: item.final,
          final: 0,
        })
        await updateInventory.save()
      }
    }



    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Inventario',
      data: dbInventario
    });
    
  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

// registrar articulo inventario
const postInventario = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbInventario = new Inventario( {
      user: uid,
      ...req.body
    });

    //crear usuario de db
    await dbInventario.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Registrado',
      data: dbInventario
    });
    
  } catch (error) {
    console.log(error)
    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }
}

// editar articulo Inventario
const putInventario = async ( req, resp = response ) => {

  const id = req.params.id;
  const inventario = req.body;
  
  try {
    const dbInventario = await Inventario.findByIdAndUpdate( id, inventario, { new: true } );
    
    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Inventario editado',
      data: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede editar'
    });

  }
}

// eliminar articulo inventario
const deleteInventario = async ( req, resp = response ) => {

  const id = req.params.id;
  
  try {
    const dbInventario = await Inventario.findByIdAndDelete( id );
    
    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Articulo inventario Eliminado',
      data: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

// obtener Inventario
const getLowInventario = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    const dbInventario = await Inventario.where({ 'user': uid })
                                          .where('final').gte(0).lte(1)
                                          .populate('insumo', 'nombre' )
                                          .sort({final: 1});

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'Low inventory',
      data: dbInventario
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
}

module.exports = {
  getInventario,
  postInventario,
  putInventario,
  deleteInventario,
  getLowInventario
}
