const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  secret: {
    type: String
  },
  client: {
    type: String
  }
  
},
  { timestamps: true });

UsuarioSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Usuario', UsuarioSchema);