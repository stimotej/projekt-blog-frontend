import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import Loader from "../components/Loader";
import { MdPersonAdd } from "react-icons/md";

const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "Admin") setIsAdmin(true);
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/admin/${user.id}`, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    axios
      .patch(
        `http://localhost:5000/api/admin/${user.id}`,
        {
          name,
          username,
          email,
        },
        { headers: { "auth-token": token } }
      )
      .then((res) => {
        console.log(res.data);
        alert("Promjene uspješno spremljene.");
      })
      .catch((error) => {
        console.log(error.response);
        alert("Greška kod spremanja");
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
            <h1 className="text-2xl font-bold ml-6">Uredi profil</h1>
          </div>
          <form className="flex flex-col mt-6" onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              required
            />
            <input
              type="text"
              placeholder="Korisničko ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              required
            />
            <div className="flex flex-row items-center justify-between mt-6">
              {isAdmin ? (
                <Link href="/register">
                  <a className="flex flex-row items-center py-2 px-5 rounded-full hover:bg-gray-100">
                    <MdPersonAdd className="mr-2" />
                    Dodaj korisnika
                  </a>
                </Link>
              ) : (
                <div className="w-1" />
              )}
              <button
                type="submit"
                className="flex flex-row items-center bg-black text-white py-3 px-8 self-end rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {loading && <Loader className="text-white mr-2 w-5 h-5" />}
                Spremi
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
