const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


// crear el server/app de express
const app = express();

//base de datos
dbConnection();

//directorio público
app.use( express.static('public') );

//cors
app.use( cors() );

//lectura y parseo del body
app.use( express.json() );

//routes
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/compras', require('./routes/compras') );
app.use( '/api/gastos', require('./routes/gastos') );
app.use( '/api/paypal', require('./routes/paypal') );

app.listen( process.env.PORT, ( )=> {
  console.log( `Servidor corriendo en puerto ${ process.env.PORT }` );
});

