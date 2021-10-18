import Styles from "./Posts.module.scss";
import PostStyles from "../../pages/blog/post/post.module.scss";

import React, { useState, useEffect, } from "react";
import ReactDOMServer from "react-dom/server";

import Lowlight from "react-lowlight";
import js from "highlight.js/lib/languages/javascript";
Lowlight.registerLanguage("js", js);

import dynamic from "next/dynamic";
import { EditorState, convertToRaw, RichUtils, Modifier, EditorBlock, DefaultDraftBlockRenderMap} from "draft-js";
import {Map} from 'immutable';
import ReactHtmlParser from "react-html-parser";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import axios from "axios";

async function uploadInlineImageForArticle(file) {
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
export default function FastEditor(props) {
  const [editor, setEditor] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  class codeBlock extends React.Component {
    render() {
      let data;
      return (
        <>
          <EditorBlock {...this.props} onChange={() => console.log(this.props)}/>
        </>
      )
    }
  }
  
  function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'code') {
      return {
        component: codeBlock,
        
      };
    }
  }
  let options = {
    inlineStyles: {
      // Override default element (`strong`).
      BOLD: { element: "b" },
      SUPERSCRIPT: { element: "sup" },
      SUBSCRIPT: { element: "sub" },
      CODE: {
        style: {
          background: "#f1f1f1",
          "border-radius": "3px",
          padding: "1em 10px",
          color: "black"
        }
      }
    },
    blockStyleFn: (block) => {
      let data = block.getData();
      if (data.size === 0) return;

      let style = {};
      if (data.get("text-align"))
        style = { ...style, textAlign: data.get("text-align") };
      return { style };
    },
    blockRenderers: {
      bold: (block) => {
        return `<b>` + block.getText() + `</b>`;
      },
      // unstyled: (block) => {
      //   return `<p class=${PostStyles.Normal}>` + block.getText() + `</P>`;
      // },
      "header-one": (block) => {
        return `<h1 class=${PostStyles.HeaderOne}>` + block.getText() + `</h1>`;
      },
      "header-two": (block) => {
        return `<h2>` + block.getText() + `</h2>`;
      },
      "header-three": (block) => {
        return `<h3>` + block.getText() + `</h3>`;
      },
      "header-four": (block) => {
        return `<h4>` + block.getText() + `</h4>`;
      },
      "header-five": (block) => {
        return `<h5>` + block.getText() + `</h5>`;
      },
      "header-six": (block) => {
        return `<h6>` + block.getText() + `</h6>`;
      },
      blockquote: (block) => {
        return (
          `<blockquote class=${PostStyles.BlockQuote}>` +
          block.getText() +
          `</blockquote>`
        );
      },
      code: (block) => {
        return ReactDOMServer.renderToStaticMarkup(
          <Lowlight language="js" value={block.getText()} />
        )
      }
    }
  };

  useEffect(() => {
    if (!editor) {
      if (!editorState.getCurrentContent().hasText()) {
        let state = stateFromHTML(props.modalData.data?.body);
        state = EditorState.createWithContent(state);
        setEditorState(state);
      }
      setEditor(true);
    }
  }, [editor, setEditor, props, editorState]);
  return (
    <div className="editor">
      {editor ? (
        <>
          
          <Editor
           
            wrapperClassName={Styles.EditorWrapperWrapper}
            editorClassName={Styles.EditorWrapper}
            toolbarClassName={Styles.ToolBarWrapper}
            blockRendererFn={myBlockRenderer}
            editorState={editorState}
            // blockRenderMap={extendedBlockRenderMap}
            onTab={(event) => {
              event.preventDefault();
              let currentState = editorState;

              const selection = currentState.getSelection();
              const blockType = currentState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();

              if (
                blockType === "unordered-list-item" ||
                blockType === "ordered-list-item"
              ) {
                setEditorState(RichUtils.onTab(event, currentState, 3));
              } else {
                let newContentState = Modifier.replaceText(
                  currentState.getCurrentContent(),
                  currentState.getSelection(),
                  "    "
                );

                setEditorState(
                  EditorState.push(
                    currentState,
                    newContentState,
                    "insert-characters"
                  )
                );
              }
            }}
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
