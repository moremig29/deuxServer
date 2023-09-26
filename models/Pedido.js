const { Schema, model } = require("mongoose");

const ProductosSchema = Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cantidad: {
    type: Number,
  }
})

const PedidoSchema = Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  fechaEntrega: {
    type: Date,
    required: true
  },
  productos: [ ProductosSchema ],
  total: {
    type: Number,
    required: true
  },
  estatus: {
    type: Schema.Types.ObjectId,
    ref: 'Estatus'
  }
},
  { timestamps: true });

PedidoSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Pedido', PedidoSchema);