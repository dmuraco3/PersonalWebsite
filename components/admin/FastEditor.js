import Styles from './Posts.module.scss'
import PostStyles from '../../pages/blog/post/post.module.scss'

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import { EditorState, convertToRaw, RichUtils, Modifier } from "draft-js";
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
    let options = {
      blockRenderers: {
        code: (block) => {
          return `<pre class=${PostStyles.Code}>` + block.getText() + "</pre>";
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
              editorState={editorState}
              onTab={(event) => {
                event.preventDefault();
                let currentState = editorState
  
                const selection = currentState.getSelection();
                const blockType = currentState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();
  
                if(blockType === "unordered-list-item" || blockType === "ordered-list-item"){
                  setEditorState(RichUtils.onTab(event, currentState, 3));
                }else{
                  let newContentState = Modifier.replaceText(
                      currentState.getCurrentContent(),
                      currentState.getSelection(),
                      '    '
                  );
              
                setEditorState(EditorState.push(currentState, newContentState, 'insert-characters'))
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
  