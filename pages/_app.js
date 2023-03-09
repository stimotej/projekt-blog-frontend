import "../styles/globals.css";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = "https://projekt-blog-backend.onrender.com/api";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
