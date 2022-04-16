import { useState } from "react";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Editor");

  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/admin/register",
        {
          username,
          password,
          email,
          name,
          role,
        },
        {
          headers: { "auth-token": token },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Korisnik uspješno izrađen.");
        router.push("/profile");
      })
      .catch((error) => {
        alert("Greška kod izrade korisnika.");
        console.log(error.response);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout title="Novi korisnik">
      <div className="flex flex-row justify-center">
        <div className="w-2/3 p-6">
          <div className="flex flex-row items-center">
            <Link href="/profile">
              <a className="bg-black shadow-md hover:shadow-lg transition-shadow text-white rounded-xl p-2">
                <MdChevronLeft size={32} />
              </a>
            </Link>
            <h1 className="text-2xl font-bold ml-6">Dodaj korisnika</h1>
          </div>
          <form onSubmit={handleRegister} className="flex flex-col mt-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              placeholder="Korisničko ime"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              placeholder="Email"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              placeholder="Ime"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              placeholder="Lozinka"
              required
            />
            <select
              className="bg-transparent border p-3 rounded-lg w-full mt-4"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              type="submit"
              className="flex flex-row items-center bg-black text-white py-3 px-8 mt-6 self-end rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {loading && <Loader className="text-white mr-2 w-5 h-5" />}
              Dodaj
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
