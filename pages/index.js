import { useRouter } from "next/router";
import ProjectStyles from './homeProjects.module.scss'

import Typist from "react-typist";
import { FaChevronDown as Down, FaChevronRight as Right } from "react-icons/fa";

import Image from 'next/image'
import Header from 'next/head'

import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [projects, setProjects] = useState(null);
  const hostUrl = process.env.NEXT_PUBLIC_URL;
  const portfolio = useRef(null);

  const executeScroll = () => {
    portfolio.current.scrollIntoView();
  };

  useEffect(() => {
    if (!projects) {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/projects`;
      fetch(url)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((json) => {
          setProjects(json);
        });
    }
    if (!posts) {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/posts`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setPosts(json);
        });
    }
  }, [posts, setPosts, projects, setProjects]);

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
    <main>
      <Header>
        <title>Dylan Muraco</title>
        <meta name="description" content="My name is Dylan Muraco. I've been desiging and building applications for 3 years."/>
      </Header>
      <div className="focal">
        <div className="focal-background"></div>
        <div className="focal-focus">
          <span style={{ fontWeight: 400 }}>I'm a </span>
          <Typist>
            <span style={{ fontWeight: 400 }}>Full Stack Developer</span>
          </Typist>

          <h4 style={{ fontWeight: 300 }}>
            designing & building exceptional projects
          </h4>

          <div className="go-to-portfolio">
            <div className="go-to-portfolio-flex" onClick={executeScroll}>
              <div className="go-to-one">view portfolio</div>

              <div className="go-to-two">
                <Down />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="porfolio-container">
        <div className="portfolio" ref={portfolio}>
          <center>
            <h3>My Recent Work</h3>
            <h5 style={{ fontWeight: 200, color: "#141c3a" }}>
              Here are a few projects I've worked on recently
            </h5>
          </center>
          <div className={ProjectStyles.ProjectsContainer}>
            {!projects && (
              <>
                <Spinner animation="border" variant="primary" />
              </>
            )}
            {projects && (
              <>
                {projects.map((item, index) => (
                  <div className={ProjectStyles.ProjectContainer} key={index}>
                    <div className={ProjectStyles.ProjectDateContainer}>
                      <span className={ProjectStyles.ProjectDate}>
                        {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className={ProjectStyles.ProjectTitleContainer}>
                      <h1 className={ProjectStyles.ProjectTitle}>{item.title}</h1>
                    </div>
                    <div className={ProjectStyles.ProjectImageContainer}>
                      <Image className={ProjectStyles.ProjectImage} src={item.image} layout="fill" objectFit="cover"/>
                    </div>
                    <div className={ProjectStyles.ProjectDescriptionContainer}>
                      <p className={ProjectStyles.ProjectDescription}>{item.description}</p>
                    </div>
                    <div className={ProjectStyles.ProjectLinkContainer}>
                      <a className={ProjectStyles.ProjectLink} href={item.link}>View Website</a>
                      <a className={ProjectStyles.CodeLink} href={item.codeLink}>View Code</a>

                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="blog-posts-container">
        <center>
          <h3>Blog</h3>
          <h5 style={{ fontWeight: 200, color: "#141c3a" }}>
            Sometimes I talk about stuff
          </h5>
        </center>

        {posts === null ? (
          <center>
            <Spinner animation="border" variant="primary" />
          </center>
        ) : (
          <div className="blog-posts" style={{ borderRadius: "6px" }}>
            {posts.map((item, index) => (
              <Card key={index} style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    <ActiveLink href={`${hostUrl}/blog/post/${item.id}`}>
                      {item.title}
                    </ActiveLink>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.date}
                  </Card.Subtitle>
                  <Card.Text style={{ width: "50%" }}>
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className="contact">
        <h1>Let's Work Together</h1>
        <h4>Have a project you'd like to discuss?</h4>
        <div className="touch-me-container">
          <a className="touch-me" href={`${process.env.NEXT_PUBLIC_URL}/contact`}>
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
