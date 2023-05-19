import { VscChromeClose, VscCheck } from "react-icons/vsc";
import {RiImageAddFill} from 'react-icons/ri'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { useEffect } from "react";

export function PostCard({ posts }) {
  const navigate = useNavigate();
  const { deletePost } = usePost();
  const handleDelete = (_id) => {
    //la t nos manda toda la informacion de cada notificacion, como su id para poder manipularla
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="text-sm text-white">Do you want to delete?</p>
          <div>
            <button
              className="rounded-full text-white mt-3 mx-2 hover:bg-green-400 p-1 ml-2 mr-4 mb-3"
              onClick={(e) => {
                e.preventDefault();
                deletePost(_id);
                toast.dismiss(t.id);
              }}
            >
              <VscCheck />
            </button>
            <button
              className="rounded-full text-white mt-3 hover:bg-red-400 p-1 ml-4 mr-2 mb-3"
              onClick={() => toast.dismiss(t.id)}
            >
              <VscChromeClose />
            </button>
          </div>
        </div>
      ),
      { style: { background: "rgb(51 65 85)" } }
    );
  };
  return (
    <div
      className="flex flex-col justify-between break-words overflow-auto shrink bg-slate-700 rounded-md hover:bg-slate-600 hover:cursor-pointer"
      onClick={(e) => {
        navigate(`/posts/${posts._id}`);
      }}
    >
      <div className="flex justify-between">
        <h3 className="p-4 text-white font-bold">{posts.title}</h3>
        <div>
          <button
            className="btn-exclude rounded-md text-white mt-3 hover:bg-red-400 p-1 mr-2 mb-3"
            onClick={(e) =>{ e.stopPropagation() 
              handleDelete(posts._id)}}
          >
            <VscChromeClose />
          </button>
        </div>
      </div>
      <p className="text-white p-4 grow">{posts.description}</p>
      <div>
        {!posts.image && <div className="h-44 flex justify-center items-center"><RiImageAddFill className="text-white w-24 h-24"/></div>}
        {posts.image && <img src={posts.image.url} className="rounded-md w-full object-cover h-44"></img>}
      </div>
    </div>
  );
}

export default PostCard;
