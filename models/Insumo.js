const { Schema, model } = require("mongoose");


const InsumoSchema = Schema({
  desc: {
    type: String,
    required: true
  },
  precio: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { 
    timestamps: true
  });

InsumoSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Insumo', InsumoSchema);