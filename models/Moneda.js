const { Schema, model } = require("mongoose");


const MonedaSchema = Schema({
  desc: {
    type: String,
    required: true
  }
},
  { timestamps: true });

MonedaSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Moneda', MonedaSchema);