const { Schema, model } = require("mongoose");


const ApikeySchema = Schema({
  apiKey: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
  
},
  { timestamps: true });

ApikeySchema.method('toJSON', function() {
  const { _id, __v, user, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports =  model('Apikey', ApikeySchema);