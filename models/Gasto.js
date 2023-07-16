const { Schema, model } = require("mongoose");


const GastoSchema = Schema({
  descripcion: {
    type: String,
    required: true
  },
  monto: {
    type: String,
    required: true,
  },
  tipo: {
    type: Number,
    required: true
  },
  fecha:{
    type: Date,
  }
});

module.exports =  model('Gasto', GastoSchema);