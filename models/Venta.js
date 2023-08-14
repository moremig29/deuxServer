const { Schema, model } = require("mongoose");


const VentaSchema = Schema({
  producto: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precioUnidad:{
    type: Number,
  },
  PrecioTotal: {
    type: Number,
    required: true
  },
  fechaVenta: {
    type: Date,
    required: true
  },
  moneda: {
    type: Schema.Types.ObjectId,
    ref: 'Moneda'
  },
  estatus: {
    type: Schema.Types.ObjectId,
    ref: 'Estatus'
  },
  contacto: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente'
  }
},
  { timestamps: true });

VentaSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Venta', VentaSchema);