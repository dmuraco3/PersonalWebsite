import { useRouter } from "next/router";
import styles from "./post.module.css";
import Navigation from "../../../components/navbar";
import { PrismaClient } from "@prisma/client";
function Blog({ post }) {
  return (
    <main>
      <Navigation />
      <div className={styles.mainContainer}>
        <h1>{post.title}</h1>
        <h5>{post.date}</h5>
        <p>{post.description}</p>
        <div>{post.body}</div>
        {/* do rest of showing here 
                show description
                show body
            */}
      </div>
    </main>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const id = params.id;
  // const res = await fetch(url + "/api/blog/post/" + id);
  // const post = await res.json();
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

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const posts = await prisma.post.findMany();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.id
      }
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Blog;
