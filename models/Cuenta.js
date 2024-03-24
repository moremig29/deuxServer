const { Schema, model } = require("mongoose");


const CuentaSchema = Schema({
  desc: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true,
  },
  tipoTransac:{
    type: Schema.Types.ObjectId,
    ref: 'TipoTransac'
  },
  tipoCuenta: {
    type: Schema.Types.ObjectId,
    ref: 'TipoCuenta'
  },
  banco: {
    type: Schema.Types.ObjectId,
    ref: 'Banco'
  },
  moneda: {
    type: Schema.Types.ObjectId,
    ref: 'Moneda'
  },
  fecha: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  cliente:{
    type: Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  pedido: {
    type: String,
  }
},
  { timestamps: true });

CuentaSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Cuenta', CuentaSchema);