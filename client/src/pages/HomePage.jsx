import { getPostsRequest } from "../api/post";
import { PostCard } from "../components/PostCard";
import { usePost } from "../context/PostContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
export function HomePage() {
  const { posts } = usePost();
  //usePost es el context, pusimos el hook useContxt en el postcontext.jsx para poder usarlo, trae todas las funciones enviadas en value, con el mandamos a traer los posts del postContext y nos manda un objeto
  if (posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-800 min-h-screen">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-2xl text-white">There is no posts</h1>
      </div>
    );
  }

  return (
    <div className=" bg-slate-800 min-h-screen max-h-full">
      <div className=" mx-4 sm:mx-8 pt-16 md:mx-10 xl:mx-52">
        <div className="flex justify-between mb-2 w-full">
          <p className="text-md text-white font-bold">Posts({posts.length})</p>
          <Link
            to="/new"
            className="py-1 px-2 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-bold"
          >
            Create new post
          </Link>
        </div>
        <div className="grid-cols-2 sm:grid-cols-3 grid xl:grid-cols-3 gap-2 pb-4">
          {posts.map((p) => (
            <PostCard key={p._id} posts={p}  />
          ))}
        </div>
      </div>
    </div>
  );
}
