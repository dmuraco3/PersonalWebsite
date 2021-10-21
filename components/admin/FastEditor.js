import Styles from "./Posts.module.scss";
import PostStyles from "../../pages/blog/post/post.module.scss";

import React, { useState, useEffect, } from "react";
import ReactDOMServer from "react-dom/server";

import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula"
import langDetector from 'lang-detector'

import dynamic from "next/dynamic";
import { EditorState, RichUtils, Modifier, EditorBlock} from "draft-js";
import {convertFromHTML, convertToHTML} from "draft-convert"

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
  

  useEffect(() => {
    if (!editor) {
      if (!editorState.getCurrentContent().hasText()) {
        // let state = stateFromHTML(props.modalData.data?.body);
        let state = convertFromHTML(convertFromHTMLOptions)(props.modalData.data?.body);
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
                convertToHTML(convertToHTMLOptions)(e.getCurrentContent())
                // stateToHTML(e.getCurrentContent(), stateToHTMLOptions)
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

const PostCodeBlock = ({code, language}) => {
  const codeType = langDetector(code)
  return (
    <pre>
      <Highlight {...defaultProps} theme={dracula} code={code} language={codeType.toLocaleLowerCase()}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          
          </>
        )}
      </Highlight>
    </pre> 
  )
}

const convertToHTMLOptions = {
  blockToHTML: (block, options) => {
    // if (block.type === "code") {
    //   return ReactDOMServer.renderToStaticMarkup(
    //     <PostCodeBlock code={block.text} language="javascript"/>
    //   );
    // }
    switch (block.type) {
      case "unstyled":
        return <p className={PostStyles.Unstyled}/>;

      case "header-one":
        return <h1 className={PostStyles.HeaderOne}/>;

      case "header-two":
        return <h2 className={PostStyles.HeaderTwo}/>;

      case "header-three":
        return <h3 className={PostStyles.HeaderThree}/>;

      case "header-four":
        return <h4 className={PostStyles.HeaderFour}/>;
      
      case "header-five":
        return <h5 className={PostStyles.HeaderFive}/>;
        
      case "header-six":
        return <h6 className={PostStyles.HeaderSix}/>;

      case "blockquote":
        return <blockquote className={PostStyles.BlockQuote} />
      
      case "code":
        return ReactDOMServer.renderToStaticMarkup(
          <PostCodeBlock code={block.text}/>
        );

      case "atomic": 
          return {start: `<figure class=${PostStyles.ImageContainer}>`, end: '</figure>',}
    }

  },
  entityToHTML: (entity, options) => {
    switch (entity.type) {
      case "LINK":
        return (
          <a href={entity.data.url}>
            {entity.data.url}
          </a>
        );
      case "IMAGE":
        return `<img style="width: 100%" src="${entity.data.src}" />`;
        // return (
        //   <figure className={PostStyles.ImageContainer}>
        //     <img
        //       src={entity.data.src}
        //       width={entity.data.width}
              
        //       alt={entity.data.alt}
        //       className={PostStyles.Image}
        //     />

        //   </figure>
        // );
    }
  }
}

const convertFromHTMLOptions = {
  htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style.color === 'blue') {
          return currentStyle.add('BLUE');
      } else {
          return currentStyle;
      }
  },
  htmlToBlock: (nodeName, node) => {
    if (nodeName === 'blockquote') {
        return {
            type: 'blockquote',
            data: {}
        };
    }
    if(nodeName === 'pre'){
      return {
        type: 'code',
        text: node.textContent
      }
    }
    if(nodeName === "figure"){
      return 'atomic'
    }
    if(nodeName === "img") {
      return "atomic"
    }
    console.log("name: ", nodeName)
  },
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === 'img') {
      return createEntity('IMAGE', 'IMMUTABLE', {src : node.src, alt: node.alt, style:"width: 100%; height: 100%;", width: "100%", height: "100%"});
    }
  },
  
}