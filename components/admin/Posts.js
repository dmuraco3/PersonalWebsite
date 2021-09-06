import React, { useMemo, useEffect, useState, Component } from "react";
import Loader from "react-loader-spinner";
import Styles from "./Posts.module.scss";
import { useRouter } from "next/router";
import { FaTrash, FaPencilAlt, FaPlusSquare } from "react-icons/fa";

import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Switch from "react-switch";

import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

function FastEditor() {
  const [editor, setEditor] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    if (!editor) {
      setEditor(true);
    }
  }, [editor, setEditor]);
  return (
    <div className="editor">
      {editor ? (
        <>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallBack,
                alt: { present: true, mandatory: true }
              }
            }}
          />
          <textarea disabled value={stateToHTML(editorState)} />
        </>
      ) : (
        <h1>weiner</h1>
      )}
    </div>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState();
  const [modalData, setModalData] = useState({
    title: "post"
  });
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleModalDataChange = (key, value) => {
    setModalData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [key]: value
      }
    }));
  };

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
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal && modalData}
            onHide={handleModalClose}
          >
            <Modal.Header closeButton closeLabel="">
              <Modal.Title id="contained-modal-title-vcenter">
                {modalData.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={Styles.ModalBody}>
              <h1 className={Styles.PostHeader}>Published</h1>
              <Switch
                className="react-switch"
                onChange={() => {
                  if (modalData.data?.published) {
                    handleModalDataChange("published", false);
                  } else {
                    handleModalDataChange("published", true);
                  }
                }}
                checked={modalData.data?.published}
                aria-label="super secret label that is not visible"
              />

              <h1 className={Styles.PostHeader}>Title</h1>
              <textarea
                onChange={(event) => {
                  console.log(event);
                }}
                contentEditable
                className={Styles.PostEditable}
              >
                {modalData.data?.title}
              </textarea>

              <h1 className={Styles.PostHeader}>Description</h1>
              <div contentEditable className={Styles.PostEditable}>
                {modalData.data?.description}
              </div>
              <h1 className={Styles.PostHeader}>Body</h1>
              <FastEditor />
            </Modal.Body>
            <Modal.Footer className={Styles.ModalFooter}>
              <Button variant="danger" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleModalClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <FaPlusSquare
            size={40}
            className={Styles.AddPost}
            onClick={() => {
              setModalData({
                title: "newPost"
              });
              setShowModal(true);
            }}
          />
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
        <div styles={{ width: "100%", textAlign: "center" }}>
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
}
