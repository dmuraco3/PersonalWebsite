import React, { useMemo, useEffect, useState, Component } from "react";
import Loader from "react-loader-spinner";
import Styles from "./Posts.module.scss";
import { useRouter } from "next/router";
import { FaTrash, FaPencilAlt, FaPlusSquare } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Switch from "react-switch";

import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import ReactHtmlParser from "react-html-parser";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import axios from "axios";

async function uploadInlineImageForArticle(file) {
  const headers = {};
  const formData = new FormData();
  formData.append("files", file);
  try {
    let { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/upload`,
      formData,
      {
        headers: { "content-type": "multipart/form-data" }
      }
    );
    return data;
  } catch (e) {
    console.log("caught error");
    console.error(e);
    return null;
  }
}

const uploadImageCallBack = async (file) => {
  const imgData = await uploadInlineImageForArticle(file);
  console.log(imgData);
  return Promise.resolve({
    data: {
      link: `${process.env.NEXT_PUBLIC_URL}${imgData?.data}`
    }
  });
};

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
function FastEditor(props) {
  const [editor, setEditor] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  let options = {
    blockRenderers: {
      code: (block) => {
        return `<pre class=${Styles.Code}>` + block.getText() + "</pre>";
      }
    }
  };
  useEffect(() => {
    if (!editor) {
      if (!editorState.getCurrentContent().hasText()) {
        let state = stateFromHTML(props.modalData.data?.body);
        state = EditorState.createWithContent(state);
        console.log(props.returnModalData);
        setEditorState(state);
      }
      setEditor(true);
    }
  }, [editor, setEditor, props, editorState]);
  return (
    <div className="editor">
      <button
        onClick={() => {
          console.log(editorState.getCurrentContent().hasText());
        }}
      >
        {" "}
        Click me to show stuff
      </button>
      {editor ? (
        <>
          <Editor
            wrapperClassName={Styles.EditorWrapperWrapper}
            editorClassName={Styles.EditorWrapper}
            toolbarClassName={Styles.ToolBarWrapper}
            editorState={editorState}
            onEditorStateChange={(e) => {
              setEditorState(e);
              props.handleModalDataChange(
                "body",
                stateToHTML(e.getCurrentContent(), options)
              );
            }}
            toolbar={{
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                alt: { present: false, mandatory: false }
              }
            }}
          />
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
  const returnModalData = () => {
    return modalData;
  };
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
              {ReactHtmlParser(modalData.data?.body)}
              <FastEditor
                handleModalDataChange={handleModalDataChange}
                modalData={modalData}
                returnModalData={returnModalData}
              />
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
