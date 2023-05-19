import {v2 as cloudinary} from 'cloudinary'

//cloudinary nos permite cargar imagenes en su web y asi mostrarlas en nuestras aplicaciones
//aqui lo configuramos con los datos de nuestra cuenta donde se almacenara
cloudinary.config({
    cloud_name:"dceospb09",
    api_key:"587298793692449",
    api_secret:"yok-ZwH3JgtxlHDKKySMnQgFvPI"
})

//para subir una imagen usamos esta funcion, que recibira una ruta del archivo (imagen) y posteriormente
//se subira a cloudinary mediante su metodo uploader, que es asincrono por lo tanto tenemos que usar async y await
export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })
}

//aqui es para borrar una imagen de cloudinary al borrar el elemento de la base de datos, recibe el id_public de la img
export const deleteImage = async (id)=>{
    return await cloudinary.uploader.destroy(id)
}