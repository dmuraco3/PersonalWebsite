import styles from "./Admin.module.scss";

import SideNav from "components/admin/SideNav";
import TopNav from "components/admin/TopNav";

import Loader from "react-loader-spinner";

import { signIn, signOut, useSession } from "next-auth/client";

import { useState } from "react";

import { Calender, Users, Messages, Email, Posts } from "components/admin";

import { withRouter, useRouter } from "next/router";
import {
  FaCalendar,
  FaUser,
  FaInbox,
  FaEnvelopeSquare,
  FaChalkboard
} from "react-icons/fa";

function Admin(props) {
  const [session, loading] = useSession();
  const [data, setData] = useState();
  const router = useRouter();
  const Applications = [
    {
      title: "Calender",
      icon: <FaCalendar />,
      active: props.router.query.active === "Calender",
      component: <Calender />
    },
    {
      title: "Users",
      icon: <FaUser />,
      active: props.router.query.active === "Users",
      component: <Users />
    },
    {
      title: "Messages",
      icon: <FaInbox />,
      active: props.router.query.active === "Messages",
      component: <Messages />
    },
    {
      title: "Email",
      icon: <FaEnvelopeSquare />,
      active: props.router.query.active === "Email",
      component: <Email />
    },
    {
      title: "Posts",
      icon: <FaChalkboard />,
      active: props.router.query.active === "Posts",
      component: <Posts />
    }
  ];
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
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/newpost`, {
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
  const activetab = () => {
    return Applications.map((item) => {
      if (item.active) {
        return item.component;
      }
    });
  };
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
            <div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <SideNav session={session} Applications={Applications} />
                {activetab()}
                {!props.router.query.active && (
                  <>
                    <div>
                      <h1>you are logged in</h1>
                      <button onClick={() => signOut()}>Sign out</button>
                      <h4>
                        {session.user.name}{" "}
                        {session.user.isAdmin && <>is an admin</>}
                      </h4>
                      <button onClick={() => getPosts()}>
                        Press Me For redis
                      </button>
                      <p>{data && <>{JSON.stringify(data)}</>}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
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
export default withRouter(Admin);
