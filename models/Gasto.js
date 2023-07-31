const { Schema, model } = require("mongoose");


const GastoSchema = Schema({
  description: {
    type: String,
    required: true
  },
  ammount: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true
  },
  date:{
    type: Date,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

GastoSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Gasto', GastoSchema);