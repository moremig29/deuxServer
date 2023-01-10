const { Schema, model } = require("mongoose");


const CompraSchema = Schema({
  name: {
    type: String,
    required: true
  },
  ammount: {
    type: String,
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
  }
});

module.exports =  model('Compra', CompraSchema);