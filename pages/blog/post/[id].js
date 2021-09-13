import { useRouter } from "next/router";
import styles from "./post.module.scss";
import Navigation from "../../../components/navbar";
import { PrismaClient } from "@prisma/client";
import ReactHtmlParser from "react-html-parser";

function Blog({ post }) {
  return (
    <main>
      <Navigation />
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
