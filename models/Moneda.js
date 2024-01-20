const { Schema, model } = require("mongoose");


const MonedaSchema = Schema({
  desc: {
    type: String,
    required: true
  },
  simbolo: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { timestamps: true });

MonedaSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Moneda', MonedaSchema);