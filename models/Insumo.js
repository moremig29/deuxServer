const { Schema, model } = require("mongoose");


const InsumoSchema = Schema({
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria'
  },
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
  basico: {
    type: Boolean,
    required: true,
    default: false
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