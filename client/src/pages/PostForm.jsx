import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePost } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import * as yup from "yup";
export function PostForm() {
  const { createPost, getPost, editPost } = usePost(); //el context siempre debe ir dentro de una funcion sino da error
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({ 
    title: "", 
    description: "",
    image: null
  });
  const [header, setHeader] = useState("Create new post");
  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getPost(params.id);
        setPost(res);
        setHeader("Edit post");
      }
    })(); //esto es para que se ejecute la funcion automaticamente en el use effect, hacemos esto pq el useEffect
    //no puede ser asincrono por si mismo
  }, [params.id]);
  return (
    <div className="h-screen bg-slate-800">
      <Formik
        initialValues={post}
        validationSchema={yup.object({
          title: yup.string().required("Title is required"),
          description: yup.string().required("Description is required"),
        })}
        //aqui se mandan los valores con el handleSubmit
        onSubmit={async (values, actions) => {
          if (params.id) {
            await editPost(params.id, values);
          } else {
            await createPost(values);
          }
          actions.setSubmitting(false)
          navigate("/"); //aqui nos manda a la pagina principal, al home
        }}
        enableReinitialize //esto es para que los valores iniciales cambien al del post que queremos editar
      >
        {/*handlesubmit sirve para que cuando se haga click al boton se manden los valores arriba y se cree el post*/}
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <div className="flex justify-center pt-10">
            <Form
              onSubmit={handleSubmit}
              className="bg-slate-700  p-4 rounded-lg flex flex-col items-center basis-96"
            >
              <h1 className="font-bold text-white">{header}</h1>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400 text-left w-full"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="bg-gray-200 focus:outline-none px-2 rounded-sm  mt-2 mb-1 w-full"
              />
              <ErrorMessage
                component="p"
                name="title"
                className="text-red-600 text-sm "
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400 text-left w-full"
              >
                Description
              </label>

              <Field
                component="textarea"
                name="description"
                placeholder="description"
                className="bg-gray-200 focus:outline-none px-2 rounded-sm  mt-2 mb-1 w-full"
              />
              <ErrorMessage
                component="p"
                name="description"
                className="text-red-600 text-sm "
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold text-gray-400 text-left w-full"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="focus:outline-none bg-slate-600 rounded-md text-white mt-3  px-3 py-2"
                onChange={(e)=> setFieldValue('image',e.target.files[0])}
              ></input>
              <button
                type="submit"
                className="bg-teal-600 rounded-md text-white mt-3 hover:bg-teal-500 px-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<AiOutlineLoading3Quarters className="animate-spin h-2 w-2"/>) : 'Save'}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
