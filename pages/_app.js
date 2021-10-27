import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "prismjs/themes/prism-okaidia.css";

import Navigation from "../components/navbar";
import Footer from "../components/Footer";
import Header from 'next/head'

import {Provider} from 'next-auth/client'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  }) {
  return (
    <>
      <Header>

        <title>Dylan Muraco</title>
        <meta name="description" content="My name is Dylan Muraco. I've been desiging and building applications for 3 years."/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@MuracoDylan"/>
        <meta name="twitter:title" content="Dylan Muraco" />
        <meta name="twitter:description" content="I write code and write about it." />
        <meta name="twitter:image" content="https://personal-website-phi-six.vercel.app/ProfilePig.jpg"/>


        <meta property="og:title" content="My name is Dylan Muraco"/>
        <meta property="og:description" content="I write code and write about it."/>
        <meta property="og:image" content="https://personal-website-phi-six.vercel.app/ProfilePig.jpg"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL}/>

        <meta name="keywords" content="web development, coding, javascript, react"/>

      </Header>
      <Provider session={session}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}
