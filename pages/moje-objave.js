import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Loader from "../components/Loader";
import BlogPost from "../components/BlogPost";

const myPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setLoading(true);
    axios
      .get("http://localhost:5000/api/posts/my", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Moje objave">
      {loading ? (
        <div className="flex flex-row justify-center w-full mt-12">
          <Loader className="w-10 h-10 border-black" />
        </div>
      ) : posts?.length <= 0 ? (
        <div className="mt-12 text-center text-gray-500">Nema objava</div>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-4">
          {posts?.map((post) => (
            <BlogPost key={post._id} post={post} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default myPosts;
