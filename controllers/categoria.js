const { response } = require('express');
const Categoria = require('../models/Categoria');

// registrar compra
const postCategoria = async ( req, resp = response ) => {

  const uid = req.uid;

  try {

    // crear usuario con el modelo
    let dbCategoria = new Categoria( {
      user: uid,
      ...req.body
    });

    //crear usuario de db
    await dbCategoria.save();

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'ok',
      banco: dbCategoria
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se pudo registrar'
    });

  }

}

const getCategoria = async ( req, resp = response ) => {

  const uid = req.uid;

  const dbCategoria = await Categoria.where({ user: uid })
                                  .sort({'nombre': 1});

  try {

    // generar response
    return resp.status(201).json({
      ok: true,
      msg: 'listado de Categoria',
      categoria: dbCategoria
    });
    
  } catch (error) {

    return resp.status(500).json({
      ok: false,
      msg: 'No se puede mostrar'
    });

  }
} 

module.exports = {
  postCategoria,
  getCategoria
}