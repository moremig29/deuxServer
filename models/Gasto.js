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

GastoSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Gasto', GastoSchema);