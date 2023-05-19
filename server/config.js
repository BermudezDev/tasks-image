import dontenv from 'dotenv'
dontenv.config();
//dotenv es para utilizar variables de entorno en nuestro proyecto, las almecenamos en el archivo .env
//aqui de cimos que use la variable de entorno o sino una opcion predeterminada
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/testdb'
export const PORT = process.env.PORT || 4000