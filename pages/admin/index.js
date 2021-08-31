import styles from "./Admin.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Loader from "react-loader-spinner";

import { signIn, signOut, useSession } from "next-auth/client";

import { useState } from "react";

export default function Admin() {
  const [session, loading] = useSession();
  const [data, setData] = useState();
  function getPosts() {
    const body = {
      title: "this is test post",
      description: "this is a post i made from the admin console",
      body:
        "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
      published: true,
      createdAt: new Date().toJSON().slice(0, 10)
    };
    if (session.user.isAdmin) {
      fetch(`https://8kcgg.sse.codesandbox.io/api/blog/newpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }
  return (
    <>
      {loading && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw"
            }}
          >
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        </>
      )}
      {!loading && (
        <>
          {session && (
            <>
              <h1>you are logged in</h1>
              <button onClick={() => signOut()}>Sign out</button>
              <h4>
                {session.user.name} {session.user.isAdmin && <>is an admin</>}
              </h4>
              <button onClick={() => getPosts()}>Press Me For redis</button>
              <p>{data && <>{JSON.stringify(data)}</>}</p>
            </>
          )}
          {!session && (
            <>
              <h1>you are not logged in </h1>
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
    </>
  );
}
