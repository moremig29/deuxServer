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

//cors comentar localhost y !origin para subir
const allowURLS = ['https://deuxcreativa.com.ve', 'http://localhost:4200']
const corsOptions = {
  origin: function (origin, callback) {
    if(!origin){//for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (allowURLS.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use( cors(corsOptions) );

//lectura y parseo del body
app.use( express.json() );

//routes
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/estatus', require('./routes/estatus') );
app.use( '/api/moneda', require('./routes/moneda') );
app.use( '/api/tipoTransac', require('./routes/tipoTransac') );
app.use( '/api/tipoCuenta', require('./routes/tipoCuenta') );
app.use( '/api/tipoCambio', require('./routes/tipoCambio') );
app.use( '/api/banco', require('./routes/banco') );
app.use( '/api/categoria', require('./routes/categoria') );
app.use( '/api/cuenta', require('./routes/cuenta') );
app.use( '/api/compra', require('./routes/compra') );
app.use( '/api/cliente', require('./routes/cliente') );
app.use( '/api/producto', require('./routes/producto') );
app.use( '/api/insumo', require('./routes/insumo') );
app.use( '/api/inventario', require('./routes/inventario') );
app.use( '/api/chart', require('./routes/chart') );
app.use( '/api/precio', require('./routes/precio') );
app.use( '/api/pedido', require('./routes/pedido') );
app.use( '/api/mensaje', require('./routes/mensaje') );

app.listen( process.env.PORT, ( )=> {
  console.log( `Servidor corriendo en puerto ${ process.env.PORT }` );
});

