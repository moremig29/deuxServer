const { Schema, model } = require("mongoose");


const InventarioSchema = Schema({
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria'
  },
  insumo: {
    type: Schema.Types.ObjectId,
    ref: 'Insumo'
  },
  inicial: {
    type: Number,
    required: true,
  },
  ventas: {
    type: Number,
    required: true,
  },
  compras: {
    type: Number,
    required: true,
  },
  final: {
    type: Number,
    required: true,
  },
  fecha: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { timestamps: true });

InventarioSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Inventario', InventarioSchema);