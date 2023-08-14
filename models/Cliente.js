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
  }
},
  { timestamps: true });

ClienteSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Cliente', ClienteSchema);