const { Schema, model } = require("mongoose");


const TipoTransacSchema = Schema({
  desc: {
    type: String,
    required: true
  }
},
  { timestamps: true });

TipoTransacSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('TipoTransac', TipoTransacSchema);