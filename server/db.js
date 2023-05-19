import mongoose from "mongoose";
import {MONGODB_URI} from './config.js'

//con esto hacemos la conexion a la base de datos, se hace con el modulo mongoose
//es asyncrono al ser una peticion al modulo, recibe un url que la tenemos en la variable de entorno en .env
export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log('connected to', db.connection.name)
  } catch (error) {
    console.error(error);
  }
}
