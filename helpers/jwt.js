const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

  const payload = { uid, name };

  return new Promise( ( resolve, reject ) => {

    jwt.sign( payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h'
    }, ( err, token ) => {

      if ( err ) {
        //mal
        reject( err );
      } else {
        // bien
        resolve( token );
      }
    });
  })

}

const generarApiKEY = ( uid, name ) => {
  
  return new Promise( (resolve, reject )  => {
    
    const key = [...Array(70)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join('');

    if (key) {
      const client = key.substring(0,50)
      const secret = key.substring(50,69)

      const payload = { client, secret }
      const apiKey = jwt.sign(payload, process.env.SECRET_JWT_SEED)

      const generatedKey = {
        client,
        secret,
        apiKey
      }
      resolve (generatedKey)
    } else {
      reject()
    }
  }
)}

module.exports = {
  generarJWT,
  generarApiKEY
}