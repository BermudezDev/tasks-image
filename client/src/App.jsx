import { HomePage, NotFoundPage, PostForm } from "./pages";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import {Toaster} from 'react-hot-toast'
function App() {
  //mediante el post provider se mandan todos los values del contexto para que puedan ser utilizados por sus hijos
  //que en este caso son las paginas
  return (
    <PostProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostForm />} />
        <Route path="*" element={<NotFoundPage />} />{" "} {/*El asterisco es para cualquier otra ruta q no exist*/}
      </Routes>
      <Toaster/>

    </PostProvider>
  );
}

export default App;
