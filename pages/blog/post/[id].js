import styles from "./post.module.scss";
import { PrismaClient } from "@prisma/client";
import {getSession} from "next-auth/client"
import ReactHtmlParser from "react-html-parser";
import Header from "next/head"
import ErrorPage from "next/error";

function Blog({ post }) {
  return (

    <main>
      {!post ? 
        <ErrorPage statusCode={404} />
        : 
        <>
          <Header>
            <title>{post.title}</title>
            <meta name="description" content={post.description}/>

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content="@MuracoDylan"/>
            <meta name="twitter:title" content={post.description}/>
            <meta name="twitter:description" content={post.description} />
            <meta name="twitter:image" content="https://personal-website-phi-six.vercel.app/ProfilePig.jpg"/>


            <meta property="og:title" content={post.title}/>
            <meta property="og:description" content={post.description}/>
            <meta property="og:image" content="https://personal-website-phi-six.vercel.app/ProfilePig.jpg"/>
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/blog/post/${post.id}`}/>

            <meta name="keywords" content="web development, coding, javascript, react"/>
          </Header>
          <div className={styles.mainContainer}>
            <div className={styles.PostHeading}>
              <h1>{post.title}</h1>
              <h5 className={styles.Time}>{post.updatedAt}</h5>
              <p className={styles.PostDescription}>{post.description}</p>
            </div>
            <div>{ReactHtmlParser(post.body)}</div>
          </div>
          
        </>}
    </main>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  // const res = await fetch(url + "/api/blog/post/" + id);
  // const post = await res.json();
  const session = await getSession(context)
  let post;
  if(session?.user.isAdmin){
    post = await prisma.post.findUnique({
      where: {
        id: Number(context.params.id)
      }
    })
  } else {
    post = await prisma.post.findFirst({
      where: {
        id: Number(context.params.id),
        published: true
      }
    })
  }
  
  if(!post) {
    return {
      props: {
        post: null  
      }
    }
  } else {
    post.createdAt = new Date(post.createdAt).toLocaleString();
    post.updatedAt = new Date(post.updatedAt).toLocaleString();
    return {
      props: {
        post
      }
    };
  }
}

export default Blog;
