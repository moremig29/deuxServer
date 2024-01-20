const { Schema, model } = require("mongoose");


const ClienteSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { timestamps: true });

ClienteSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Cliente', ClienteSchema);