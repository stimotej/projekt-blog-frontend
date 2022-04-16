import { useState, useEffect } from "react";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/api/admin/login", { username, password })
      .then((response) => {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
      })
      .catch((error) => {
        if (error.response.status === 400)
          setError("Pogrešno korisničko ime ili lozinka.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) router.push("/");
  }, [router]);

  return (
    <div className="h-screen flex flex-row items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-6 w-1/3">
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <a className="bg-black shadow-md hover:shadow-lg transition-shadow text-white rounded-xl p-2">
              <MdChevronLeft size={32} />
            </a>
          </Link>
          <h1 className="text-2xl font-semibold text-center">Prijavi se</h1>
          <div className="w-[48px]" />
        </div>
        {error && <li className="text-red-500 mt-6 -mb-2">{error}</li>}
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-none border rounded-lg p-4 mt-6"
            placeholder="Korisničko ime"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border rounded-lg p-4 mt-4"
            placeholder="Lozinka"
            required
          />
          <button
            type="submit"
            className="bg-black text-white rounded-lg p-4 mt-4 shadow-md hover:shadow-lg transition-shadow"
          >
            Prijavi se
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="font-light">Nemaš račun?</p>
          <Link href="/register">
            <a className="font-semibold">Registriraj se</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
