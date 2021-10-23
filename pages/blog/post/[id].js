import styles from "./post.module.scss";
import { PrismaClient } from "@prisma/client";
import ReactHtmlParser from "react-html-parser";
import Header from "next/head"

function Blog({ post }) {
  return (

    <main>
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
  let { id } = context.query;
  id = parseInt(id);
  const post = await prisma.post.findUnique({
    where: {
      id: id
    }
  });
  post.createdAt = new Date(post.createdAt).toLocaleString();
  post.updatedAt = new Date(post.updatedAt).toLocaleString();

  return {
    props: {
      post
    }
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10 // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.

// export async function getServerSideProps() {
//   const prisma = new PrismaClient();

//   const posts = await prisma.post.findMany();

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => {
//     return {
//       params: {
//         id: post.id.toString()
//       }
//     };
//   });

//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: false };
// }

export default Blog;
