const { Schema, model } = require("mongoose");


const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  insumos: [{
    type: Schema.Types.ObjectId,
    ref: 'Insumo'
  }],
  costo_total: {
    type: Number,
    required: true
  },
  precio_venta: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { timestamps: true });

ProductoSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Producto', ProductoSchema);