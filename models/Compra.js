const { Schema, model } = require("mongoose");


const CompraSchema = Schema({
  name: {
    type: String,
    required: true
  },
  ammount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  note:{
    type: String,
  },
  status:{
    type: Boolean,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

CompraSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports =  model('Compra', CompraSchema);