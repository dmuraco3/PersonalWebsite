import { useState, useEffect } from "react";

export default function Footer() {
  const [styles, setStyles] = useState({});
  useEffect(() => {
    const contentHeight = document.body.scrollHeight;
    const innerHeight = window.innerHeight;
    if (contentHeight <= innerHeight) {
      setStyles(halfStyle);
    } else {
      setStyles(fullStyle);
    }
  }, [styles, setStyles]);
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
