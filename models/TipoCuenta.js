const { Schema, model } = require("mongoose");


const TipoCuentaSchema = Schema({
  desc: {
    type: String,
    required: true
  }
},
  { timestamps: true });

TipoCuentaSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('TipoCuenta', TipoCuentaSchema);