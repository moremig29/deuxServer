const { Schema, model } = require("mongoose");

const ItemsSchema = Schema({
  articulo: {
    type: Schema.Types.ObjectId,
    ref: 'Insumo'
  },
  cantidad: {
    type: Number,
  }
}, { _id : false } );

const PedidoSchema = Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  fechaEntrega: {
    type: Date,
    required: true
  },
  lugarEntrega: {
    type: String,
  },
  item: ItemsSchema,
  total: {
    type: Number,
    required: true
  },
  estatus: {
    type: Schema.Types.ObjectId,
    ref: 'Estatus'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { timestamps: true });

PedidoSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

ItemsSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  return object;
});

module.exports =  model('Pedido', PedidoSchema);