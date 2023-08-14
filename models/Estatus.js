const { Schema, model } = require("mongoose");


const EstatusSchema = Schema({
  desc: {
    type: String,
    required: true
  }
},
  { 
    timestamps: true,
    collection: 'estatus' 
  });

EstatusSchema.method('toJSON', function() {
  const { _id, __v, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Estatus', EstatusSchema);