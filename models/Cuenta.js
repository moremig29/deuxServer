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
  fecha: {
    type: Date,
    required: true
  }
},
  { timestamps: true });

CuentaSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Cuenta', CuentaSchema);