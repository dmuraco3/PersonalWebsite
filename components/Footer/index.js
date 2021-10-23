import { useState, useEffect } from "react";

export default function Footer() {
  const [styles, setStyles] = useState();
  const [windowListener, setWindowListener] = useState();
  const changeStyle =() => {
    const contentHeight = document.body.scrollHeight;
    const innerHeight = window.innerHeight;
    if (document.body.scrollHeight <= innerHeight) {
      setStyles(halfStyle);
    } else {
      setStyles(fullStyle);
    }
  }
  useEffect(() => {
    if(!windowListener){
      window.addEventListener("resize", changeStyle);
      const resizeObserver = new ResizeObserver(changeStyle);
      resizeObserver.observe(document.body)
      setWindowListener(true);
    }
    
  }, [windowListener, changeStyle]);
  const fullStyle = {
    backgroundColor: "#212529",
    color: "white",
    padding: "10px",
    width: "100%"
  };
  const halfStyle = {
    backgroundColor: "#212529",
    color: "white",
    padding: "10px",
    position: "absolute",
    bottom: 0,
    width: "100%"
  };
  return (
    <footer style={styles}>
      <center>
        <a>© 2021 Dylan Muraco. All rights reserved.</a>
      </center>
    </footer>
  );
}
