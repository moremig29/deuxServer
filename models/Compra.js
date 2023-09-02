const { Schema, model } = require("mongoose");


const CompraSchema = Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precio:{
    type: Number,
  },
  fecha: {
    type: Date,
    required: true
  }
},
  { timestamps: true });

CompraSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Compra', CompraSchema);