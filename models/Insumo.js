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
  }
},
  { 
    timestamps: true
  });

InsumoSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Insumo', InsumoSchema);