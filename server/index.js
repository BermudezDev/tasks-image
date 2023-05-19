import {connectDB} from './db.js'
import { PORT } from './config.js';
import app from './app.js'
connectDB(); //manda la conexion a la base de datos

app.listen(PORT); //inicia el servidor en el puerto de la variable de entorno
console.log('server is running on port', PORT)