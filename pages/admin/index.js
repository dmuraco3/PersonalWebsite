import styles from "./Admin.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { signIn, signOut, useSession } from "next-auth/client";

import { useState } from "react";

export default function Admin() {
  const [session, loading] = useSession();
  const [data, setData] = useState();
  function getPosts() {
    if (session.user.isAdmin) {
      fetch(`${process.env.url}/api/blog/posts`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }
  return (
    <>
      {session && (
        <>
          <h1>you are logged in</h1>
          <button onClick={() => signOut()}>Sign out</button>
          <h4>
            {session.user.name} {session.user.isAdmin && <>is an admin</>}
          </h4>
          <button onClick={() => console.log(session.user)}>
            Press Me For authCall
          </button>
        </>
      )}
      {!session && (
        <>
          <h1>you are not logged in </h1>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  );
}
