const { Schema, model } = require("mongoose");


const PaypalSchema = Schema({
  descripcion: {
    type: String
  },
  monto: {
    type: Number,
    required: true
  },
  fecha:{
    type: Date,
    required: true
  },
  tipo: {
    type: Number,
    required: true
  }
});

module.exports =  model('Paypal', PaypalSchema);