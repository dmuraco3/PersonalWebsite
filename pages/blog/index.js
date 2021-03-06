import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/router";
import {getPosts} from '../../helpers/Posts'
import Styles from "./blog.module.scss";

function Blog({ posts }) {
  function ActiveLink({ children, href }) {
    const router = useRouter();
    const style = {
      marginRight: 10,
      color: "blue"
    };

    const handleClick = (e) => {
      e.preventDefault();
      router.push(href);
    };

    return (
      <a href={href} onClick={handleClick} style={style}>
        {children}
      </a>
    );
  }

  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Posts</h1>
      <div className={Styles.postsContainer}>
        {posts && (
          <>
            {posts.map((item, index) => (
              <div key={index}>
                <h1>
                  <ActiveLink
                    href={`${process.env.NEXT_PUBLIC_URL}/blog/post/${item.id}`}
                  >
                    {item.title}
                  </ActiveLink>
                  <h4>{new Date(item.createdAt).toDateString("--MM-DD")}</h4>
                  <p style={{ fontSize: 16 }}>{item.description}</p>
                </h1>
              </div>
            ))}
          </>
        )}
        {!posts && (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  const posts = await getPosts();
  return {
    props: {
      posts
    },
    revalidate: 5,
  };
}

export default Blog;
