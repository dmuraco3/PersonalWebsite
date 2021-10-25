import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import ActiveLink from "../ActiveLink";

import Link from "next/link";
import { useState } from "react";

export default function Navigation(props) {
  const [Active, setActive] = useState("HOME");
  const [Hovered, setHovered] = useState(null);

  function ActiveHovered(ElementName) {
    if (Active !== ElementName) {
      setHovered(ElementName);
    }
  }
  const deActiveHovered = () => {
    setHovered(null);
  };
  return (
    <Navbar
      className="navbar"
      bg="dark"
      expand="md"
      variant="dark"
      style={props.style}
    >
      <Navbar.Brand href="/" className="Logo">
        Dylan Muraco
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <ActiveLink href="/" className="link">
            HOME
          </ActiveLink>
          <ActiveLink href="/projects">PROJECTS</ActiveLink>

          <ActiveLink href="/blog" className="link">
            BLOG
          </ActiveLink>

          <ActiveLink href="/about" className="link">
            ABOUT
          </ActiveLink>

          <ActiveLink href="/contact" className="link">
            CONTACT
          </ActiveLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
