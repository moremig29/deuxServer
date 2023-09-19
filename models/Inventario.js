const { Schema, model } = require("mongoose");


const InventarioSchema = Schema({
  articulo: {
    type: String,
    required: true
  },
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cantidad: {
    type: Number,
    required: true,
  },
  fecha_compra: {
    type: Date,
    required: true
  }
},
  { timestamps: true });

InventarioSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Inventario', InventarioSchema);