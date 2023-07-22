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

PaypalSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Paypal', PaypalSchema);