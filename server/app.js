import express from "express";
import postRoutes from "./routes/post.routes.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
//middlewares (se manejan antes de llegar a las rutas)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); //para que pueda manejar jsons

//esto es para la subida de imagenes, lo sacamos del modulo express-fileuploaad
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

//routes
app.use(postRoutes);
app.use(express.static(join(__dirname, '../client/dist')))
export default app;
