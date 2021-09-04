import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Styles from "./Posts.module.scss";
import { useRouter } from "next/router";

import { FaTrash, FaPencilAlt } from "react-icons/fa";

export default function Posts() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    if (!posts) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/posts`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setPosts(json);
        });
    }
  }, [posts, setPosts]);

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
    <div className={Styles.Container}>
      <div className={Styles.PostsHeader}>
        <h1>Posts</h1>
      </div>
      {posts && (
        <div className={Styles.PostsContainer}>
          {posts.map((item, index) => (
            <div key={index} className={Styles.PostContainer}>
              <div className={Styles.PostTools}>
                <FaPencilAlt
                  className={Styles.Edit}
                  size={20}
                  onClick={() => {
                    console.log();
                  }}
                />
                <FaTrash
                  className={Styles.Delete}
                  size={20}
                  onClick={() => {
                    console.log();
                  }}
                />
              </div>
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
        </div>
      )}
      {!posts && (
        <>
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        </>
      )}
    </div>
  );
}
