import TopNav from "./TopNav";

import React, {
  useMemo,
  useEffect,
  useState,
  Component,
  useCallback
} from "react";
import Loader from "react-loader-spinner";
import Styles from "./Posts.module.scss";
import PostStyles from "../../pages/blog/post/[id]";
import { useRouter } from "next/router";
import { FaTrash, FaPencilAlt, FaPlusSquare } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { Button, FloatingLabel, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";

import ReactHtmlParser from "react-html-parser";
import FastEditor from "./FastEditor";

export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState();
  const [showPostWarning, setShowPostWarning] = useState(false);
  const [postWarningInfo, setPostWarningInfo] = useState();
  const [modalData, setModalData] = useState({
    title: "post",
    edit: false,
    data: {
      published: false,
      body: ""
    }
  });
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const postData = (url) => {
    let data = modalData.data;
    if (!data.hasOwnProperty("title")) {
      setPostWarningInfo("missing title");
      setShowPostWarning(true);
    } else if (!data.hasOwnProperty("description")) {
      setPostWarningInfo("missing description");
      setShowPostWarning(true);
    } else if (!data.hasOwnProperty("published")) {
      setPostWarningInfo("missing published");

      setShowPostWarning(true);
    } else if (!data.hasOwnProperty("link")) {
      setPostWarningInfo("missing link");
      setShowPostWarning(true);
    } else if (!data.hasOwnProperty("codeLink")) {
      setPostWarningInfo("missing codeLink");
      setShowPostWarning(true);
    } else if (!data.hasOwnProperty("image")) {
      setPostWarningInfo("missing image");
      setShowPostWarning(true);
    } else if (!data.hasOwnProperty("body")) {
      setPostWarningInfo("missing body");
      setShowPostWarning(true);
    } else {
      setShowPostWarning(false);
      console.log(modalData.data);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(modalData.data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShowModal(false);
          getPosts();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const deletePost = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/deletepost`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const editPost = (data) => {
    let postData = data;
    setModalData((prevstate, data) => ({
      ...prevstate,
      edit: true,
      title: "Edit Post",
      data: {
        title: postData.title,
        description: postData.description,
        published: postData.published,
        link: postData.link,
        codeLink: postData.codeLink,
        image: postData.image,
        body: postData.body,
        id: postData.id
      }
    }));
    setShowModal(true);
  };
  const getPosts = useCallback(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => console.error(error));
  }, [setPosts]);

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
      getPosts();
    }
  }, [posts, getPosts]);

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
        <h1>PROJECTS</h1>
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
              <Alert
                variant="danger"
                show={showPostWarning}
                onClose={() => setShowPostWarning(false)}
                dismissible
              >
                <Alert.Heading>Error with posting this article</Alert.Heading>
                <p>{postWarningInfo}</p>
              </Alert>
              <Form>
                <Form.Group>
                  <h1 className={Styles.PostHeader}>Title</h1>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Title"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={modalData.data?.title}
                      onChange={(e) => {
                        handleModalDataChange("title", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group>
                  <h1 className={Styles.PostHeader}>Description</h1>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={modalData.data?.description}
                      onChange={(e) => {
                        handleModalDataChange("description", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
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
                    aria-label="Published"
                    id="publishedSwitch"
                  />
                </Form.Group>
                <Form.Group>
                  <h1 className={Styles.PostHeader}>Link</h1>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="link"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={modalData.data?.link}
                      onChange={(e) => {
                        handleModalDataChange("link", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <h1 className={Styles.PostHeader}>Code Link</h1>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="codeLink"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={modalData.data?.codeLink}
                      onChange={(e) => {
                        handleModalDataChange("codeLink", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <h1 className={Styles.PostHeader}>Image Link</h1>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="image"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={modalData.data?.image}
                      onChange={(e) => {
                        handleModalDataChange("image", e.target.value);
                      }}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <h1 className={Styles.PostHeader}>Body</h1>

                  <FastEditor
                    handleModalDataChange={handleModalDataChange}
                    modalData={modalData}
                  />
                </Form.Group>
              </Form>
              <div>{ReactHtmlParser(modalData.data?.body)}</div>
            </Modal.Body>
            <Modal.Footer className={Styles.ModalFooter}>
              <Button variant="danger" onClick={handleModalClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (modalData.edit) {
                    postData(
                      `${process.env.NEXT_PUBLIC_URL}/api/projects/editpost`
                    );
                  }
                  if (!modalData.edit) {
                    postData(
                      `${process.env.NEXT_PUBLIC_URL}/api/projects/newproject`
                    );
                  }
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <FaPlusSquare
            size={40}
            className={Styles.AddPost}
            onClick={() => {
              setModalData((prevState) => ({
                ...prevState,
                title: "New Project"
              }));
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
                    editPost(item);
                  }}
                />
                <FaTrash
                  className={Styles.Delete}
                  size={20}
                  onClick={() => {
                    deletePost(item.id);
                  }}
                />
              </div>
              <div className={Styles.PostMain}>
                <h1>
                  <ActiveLink
                    href={`${process.env.NEXT_PUBLIC_URL}/projects/${item.id}`}
                  >
                    {item.title}
                  </ActiveLink>
                  <h4>{new Date(item.createdAt).toDateString("--MM-DD")}</h4>
                  <p style={{ fontSize: 16 }}>{item.description}</p>
                </h1>
              </div>
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
