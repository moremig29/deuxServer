const mongoose = require('mongoose');

const dbConnection = async() => {

  try{

    await mongoose.connect( process.env.BD_CNN , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('DB online');

  } catch (error) {

    console.log( error );
    throw new Error( 'Error al inicializar DB ');
  }

}

module.exports = {
  dbConnection
}

//mongodb+srv://laptopUser:clyRWxBmQx0cZW1J@cluster0.ylcnq9w.mongodb.net/deux
//mongodb://127.0.0.1:27017/deux
