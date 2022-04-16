import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

const NewPost = () => {
  const router = useRouter();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("nature");

  const [loading, setLoading] = useState(false);

  const handlePublishPost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/posts",
        {
          image,
          title,
          description,
          body,
          category,
        },
        { headers: { "auth-token": token } }
      )
      .then((res) => router.push("/"))
      .catch((error) => {
        console.log(error.response);
        router.push("/");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout title="Nova objava">
      <div className="flex flex-row justify-center">
        <div className="w-2/3 p-6">
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="bg-black shadow-md hover:shadow-lg transition-shadow text-white rounded-xl p-2">
                <MdChevronLeft size={32} />
              </a>
            </Link>
            <h1 className="text-2xl font-bold ml-6">Nova objava</h1>
          </div>
          <form className="flex flex-col" onSubmit={handlePublishPost}>
            <input
              type="text"
              placeholder="Link slike"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-8"
            />
            <input
              type="text"
              placeholder="Naslov"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              required
            />
            <textarea
              placeholder="Kratki opis"
              value={description}
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              required
            />
            <textarea
              placeholder="Sadržaj"
              value={body}
              rows={6}
              onChange={(e) => setBody(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              required
            />
            <select
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="nature">Priroda</option>
              <option value="animals">Životinje</option>
              <option value="plants">Biljke</option>
              <option value="cars">Auti</option>
            </select>
            <button
              type="submit"
              className="flex flex-row items-center bg-black text-white py-3 px-8 mt-6 self-end rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {loading && <Loader className="text-white mr-2 w-5 h-5" />}
              Objavi
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewPost;
