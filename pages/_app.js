import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "prismjs/themes/prism-okaidia.css";


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
