const { Schema, model } = require("mongoose");


const ProductoSchema = Schema({
  desc: {
    type: String,
    required: true
  }
},
  { timestamps: true });

ProductoSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Producto', ProductoSchema);