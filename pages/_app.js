import "../styles/globals.scss";
import "../styles/code-highlighting.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
