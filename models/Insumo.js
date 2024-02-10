const { Schema, model } = require("mongoose");


const InsumoSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  unidadesCompra: {
    type: Number,
    default: 0
  },
  costoCompra: {  
    type: Number,
    default: 0
  },
  costoUnidad: {  
    type: Number,
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