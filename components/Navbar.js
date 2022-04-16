import { useEffect, useState } from "react";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) setUser(user);
    else setUser(null);

    if (token) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  const loggOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    router.push("/");
    setLoggedIn(false);
  };

  return (
    <div className="h-[56px] flex flex-row items-center justify-between px-12 bg-white w-full shadow-lg">
      <Link href="/">
        <a className="uppercase font-bold text-xl">BLOG</a>
      </Link>
      {loggedIn ? (
        <div className="flex flex-row">
          <Link href="/nova-objava">
            <a className="flex flex-row items-center py-2 px-5 rounded-full bg-black text-white shadow-md hover:shadow-lg transition-shadow">
              <MdAdd className="mr-2" />
              Nova objava
            </a>
          </Link>
          <button
            className="y-2 px-5 rounded-full hover:bg-gray-100 ml-2"
            onClick={loggOut}
          >
            Odjavi se
          </button>
          <Link href="/profile">
            <a className="items-center py-2 px-5 rounded-full hover:bg-gray-100 mr-2 font-bold">
              {user?.name}
            </a>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row">
          <Link href="/login">
            <a className="py-2 px-5 rounded-full bg-black text-white shadow-md hover:shadow-lg transition-shadow">
              Prijavi se
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
