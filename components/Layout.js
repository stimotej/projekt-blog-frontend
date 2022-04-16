import Head from "next/head";
import Navbar from "./navbar";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Jednostavna blog aplikacija" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
