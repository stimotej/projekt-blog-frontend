import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import moment from "moment";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { MdDelete } from "react-icons/md";

const Objava = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  const [canEdit, setCanEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) setCanEdit(true);
    else setCanEdit(false);

    if (user?.role === "Admin") setIsAdmin(true);
    else setIsAdmin(false);

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleComment = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`http://localhost:5000/api/posts/${id}/comments`, {
        body,
        name,
      })
      .then((response) => {
        setPost(response.data);
        setBody("");
        setName("");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    const token = localStorage.getItem("auth_token");
    if (confirm("Jeste li sigurni da želite obrisati ovu objavu?"))
      axios
        .delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { "auth-token": token },
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => alert("Greška kod brisanja objave."));
  };

  const handleDeleteComment = (commentId) => {
    const token = localStorage.getItem("auth_token");
    if (confirm("Jeste li sigurni da želite obrisati ovaj komentar?"))
      axios
        .delete(`http://localhost:5000/api/posts/${id}/comments/${commentId}`, {
          headers: { "auth-token": token },
        })
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
  };

  return (
    <Layout title="Objava">
      {loading ? (
        <div className="flex flex-row justify-center w-full mt-12">
          <Loader className="w-10 h-10 border-black" />
        </div>
      ) : (
        <div className="flex flex-row justify-center">
          <div className="w-2/3 p-6">
            <div className="flex flex-row">
              <Link href="/">
                <a className="bg-black shadow-md hover:shadow-lg transition-shadow text-white rounded-xl p-2">
                  <MdChevronLeft size={32} />
                </a>
              </Link>
            </div>
            <h1 className="text-2xl font-bold mt-6">{post?.title}</h1>
            <p className="text-gray-500 font-light">
              {post?.author?.name} |{" "}
              {moment(post?.createdAt).format("DD/MM/YYYY")}
            </p>
            {canEdit && (
              <div className="flex flex-row mt-4">
                <Link href={`/uredi-objavu/${id}`}>
                  <a className="items-center py-2 px-5 rounded-full bg-black text-white shadow-md hover:shadow-lg transition-shadow">
                    Uredi
                  </a>
                </Link>
                {isAdmin && (
                  <button
                    onClick={handleDelete}
                    className="ml-2 items-center py-2 px-5 rounded-full bg-red-500 text-white shadow-md shadow-red-500/50 hover:shadow-red-500/50 hover:shadow-lg transition-shadow"
                  >
                    Obriši
                  </button>
                )}
              </div>
            )}
            {post?.image && (
              <img
                src={post.image}
                className="w-full h-auto rounded-lg mt-6 shadow-md"
              />
            )}
            <p className="mt-6">{post?.body}</p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Komentari ({post?.comments?.length})
              </h3>
              {post?.comments?.map((comment) => (
                <div key={comment._id} className="border rounded-lg p-2 mb-2">
                  <div className="flex flex-row justify-between items-start">
                    <p className="text-lg">{comment.body}</p>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="items-center p-2 rounded-full bg-red-500 text-white shadow-md shadow-red-500/50 hover:shadow-red-500/50 hover:shadow-lg transition-shadow"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-500 font-light text-sm mt-2">
                    {comment?.name} |{" "}
                    {moment(comment.date).format("DD/MM/YYYY")}
                  </p>
                </div>
              ))}
              <form onSubmit={handleComment} className="mt-6">
                <textarea
                  type="text"
                  placeholder="Upiši komentar na objavu..."
                  className="bg-transparent border p-4 rounded-lg w-full"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
                <div className="flex flex-row justify-between mt-2">
                  <input
                    type="text"
                    placeholder="Ime"
                    className="bg-transparent border p-3 rounded-lg w-1/2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    Pošalji
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Objava;
