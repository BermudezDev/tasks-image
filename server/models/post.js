import mongoose from "mongoose";

//este es el modelo del elemento post que se almacenara en la base de datos
//tiene todos sus parametros, y con este schema posteriormente podremos crear un elemento para poder 
//almacenarlo en la base de datos
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
});

//aqui mandamos a que se exporte el schema, con el nombre "Post"
export default mongoose.model("Post", postSchema);
