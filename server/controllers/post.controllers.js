//los controladores son para que solo los mandemos a llamar en las rutas y tengamos el codigo mas ordenado
import Post from "../models/post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

//los controles son funciones que se ejecutarán cuando el usuario ingrese a cierta ruta
//algunas reciben un parametro como el id en la url, y una es para crear un objeto post
//por lo tanto necesita que le mandemos los parametro titulo, descripcion e imagen (si va a tener una)
export const getPost = async (req, res) => {
  try {
    //aqui con Post.find mandamos a trar todos los posts del modelo que creamos, de la base de datos
    //como no le especificamos in id manda a traer todos, es asincrono porque espera de la base de datos
    const post = await Post.find();
    res.send(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    //aqui extraemos el titulo y descripcion del body, con las llaves lo sacamos mas facil
    const { title, description } = req.body;
    let image; //esta variable es para almacenar datos de la imagen que se subira en la bd
    //aqui verificamos si en el request enviaron una imagen con el post para subirla
    if (req.files?.image) {
    //aqui usamos la función uploadImage para subir la imagen que viene en el body a cloudinary, recibe la url de esta
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath); 
      //para borrar la imagen del sistema, xq ya esta en cloudinary y no es necesario que se guarde aqui
      
      //con esta variable extraemos los datos de la imagen subida a cloudinary, solo los que necesitamos para subirla
      //a la base de datos, que son el url y el id
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      console.log(result);
    }
    //y aqui finalmente se guarda el nuevo objeto en la base de datos, la imagen solo se pasa opcionalmente
    const newPost = new Post({ title, description, image });
    await newPost.save();

    return res.json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {id} = req.params
    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      const res = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: res.secure_url,
        public_id: res.public_id,
      };
    }
    const updatedPost = await Post.findByIdAndUpdate(id,{ $set: req.body}, {
      new: true, //esto es para que nos devuelva el nuevo dato con todos lo que ingresamos y no el antiguo
    });

    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    //si np encuentra el post indicado manda error 
    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }
    //si el post que queremos eliminar tiene imagen la mandamos a borrar de cloudinary
    if (!post) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPostId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.sendStatus(404);

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
