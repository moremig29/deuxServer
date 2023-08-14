const { Schema, model } = require("mongoose");


const InventarioSchema = Schema({
  producto: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precio:{
    type: Number,
  },
  fechaCompra: {
    type: Date,
    required: true
  }
},
  { timestamps: true });

InventarioSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Inventario', InventarioSchema);