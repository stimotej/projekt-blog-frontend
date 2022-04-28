import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import BlogPost from "../components/BlogPost";
import axios from "axios";
import Loader from "../components/Loader";

export default function Home() {
  const [activeTab, setActiveTab] = useState("");

  const tabItems = [
    { title: "Sve objave", value: "" },
    { title: "Priroda", value: "nature" },
    { title: "Životinje", value: "animals" },
    { title: "Biljke", value: "plants" },
    { title: "Auti", value: "cars" },
  ];

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Početna">
      <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} />
      {loading ? (
        <div className="flex flex-row justify-center w-full mt-12">
          <Loader className="w-10 h-10 border-black" />
        </div>
      ) : posts?.filter(
          (post) => activeTab === "" || post.category === activeTab
        ).length <= 0 ? (
        <div className="mt-12 text-center text-gray-500">
          {activeTab === ""
            ? "Nema objava"
            : "Nema objava za odabranu kategoriju"}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-4 gap-4">
          {posts
            ?.filter((post) => activeTab === "" || post.category === activeTab)
            ?.map((post) => (
              <BlogPost key={post._id} post={post} />
            ))}
        </div>
      )}
    </Layout>
  );
}
