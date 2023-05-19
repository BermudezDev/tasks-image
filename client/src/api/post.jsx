import axios from "axios";

export const getPostsRequest = async () => {
  const data = await axios.get("http://localhost:4000/posts");
  return data;
};

export const createPostRequest = async (post) => {
  const newForm = new FormData();

  for (let key in post) {
    newForm.append(key, post[key]);
  }
  const data = await axios.post("http://localhost:4000/posts", newForm, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return data;
};

export const deletePostRequest = async (_id) => {
  await axios.delete("http://localhost:4000/posts/" + _id);
};

export const getPostRequest = async (_id) => {
  const data = await axios.get("http://localhost:4000/posts/" + _id);
  return data;
};

export const editPostRequest = async (_id, post) => {
  const formEdit = new FormData();
  for (let key in post) {
    //por cada elemento en post (title, description, etc.)
    formEdit.append(key, post[key]); //lo agrega al form
  }
  const data = await axios.put("http://localhost:4000/posts/" + _id, formEdit, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
