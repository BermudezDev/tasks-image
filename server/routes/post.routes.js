import { Router } from "express";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostId,
} from "../controllers/post.controllers.js";
//estas son las funcionalidades de las rutas, tambien llamados controladores, las separamos para más comodidad

//el modulo router viene de express y es para poder cambiar entre paginas mediante la url
const router = Router();

router.get("/posts", getPost);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost); //el :id es para indicarle que se recibira un parametro "id" en el request
router.delete("/posts/:id", deletePost);
router.get("/posts/:id", getPostId);

export default router;
