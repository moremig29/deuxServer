const { Schema, model } = require("mongoose");

const BancoSchema = Schema({
  banco: {
    type: String,
    required: true
  }
},
  { 
    timestamps: true,
  });

BancoSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Banco', BancoSchema);