import { useState, createContext, useEffect, useContext } from "react";
import {
  getPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  editPostRequest
} from "../api/post";

export const postContext = createContext();
//esto es para que los otros componentes puedan usar el contexto y usar el valor, en este caso de los posts
export const usePost = () => {
  const context = useContext(postContext);
  return context;
};
//para poder utilizar el context primero lo mandamos a llamar a reacct y luego los asignamos a una constante
//el post container devuelve todos sus "hijos" que son las paginas provenientes de app.jsx, que son manejades por las
//rutas, esto lo hacemos para que en todas se pueda acceder a los datos sin que tengamos que importarlas de una a la otra
export const PostProvider = ({ children }) => {
  const [posts, setPost] = useState([]);
  //para obtener los posts
  const getPosts = async () => {
    const res = await getPostsRequest();
    setPost(res.data);
  };
  //para crear los posts
  const createPost = async (newPost) => {
    const res = await createPostRequest(newPost);
    setPost([...posts, res.data]); //esto es para que se carguen los post al estado sin recargar la pagina y se muestre
  };
  //para eliminar los posts
  const deletePost = async (id) => {
    await deletePostRequest(id);
    const deleted = posts.filter((p) => p._id !== id)
    setPost(deleted);
  };
  //para traer un post unico con el id
  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data
  }

  const editPost = async (id, postEdit) => {
    const res = await editPostRequest(id, postEdit)
    setPost(posts.map((post)=> (post._id === id ? res.data : post)))
  }
  //con el useEFfect hacemos que se ejecute la funcion getPost, por lo que mandamos a traer los valores
  //de la base de datos con axios, esto se ejecuta una vez que cargue el componente
  useEffect(() => {
    getPosts();
  }, []);

  //el context provider es para que todos los hijos en el context podamos enviarles valores, aqui le envio el
  //estado del post para que pueda ser modificado en los otros componentes
  return (
    <postContext.Provider value={{ posts, getPosts, getPost, editPost, createPost, deletePost }}>
      {children}
    </postContext.Provider>
  );
};
