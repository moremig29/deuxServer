const { Schema, model } = require("mongoose");


const TipoCambioSchema = Schema({
  TipoCambio: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
  { timestamps: true });

TipoCambioSchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('TipoCambio', TipoCambioSchema);