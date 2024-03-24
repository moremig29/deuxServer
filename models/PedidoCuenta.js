const { Schema, model } = require("mongoose");


const PedidoCuentaSchema = Schema({
  pedido: {
    type: Schema.Types.ObjectId,
    ref: 'Pedido',
  },
  cuenta: {
    type: Schema.Types.ObjectId,
    ref: 'Cuenta',
  }
},
  { timestamps: true });

PedidoCuentaSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('PedidoCuenta', PedidoCuentaSchema);