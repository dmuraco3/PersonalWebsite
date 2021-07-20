import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'
import Navigation from '../components/navbar'
import Footer from '../components/Footer'

import Typist from 'react-typist'
import {FaChevronDown as Down, FaChevronRight as Right} from 'react-icons/fa'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useEffect, useState, useRef } from 'react'
import router from 'next/router'

export default function Home() {
  const work = [
    {
      title: 'this is a project',
      description: 'this is a project I\'ve been working on',
      link: 'http://127.0.0.1:3000/about',
      image: '/color-2174065_640.png'
    },
    {
      title: 'this is a project',
      description: 'this is a project I\'ve been working on',
      link: 'http://127.0.0.1:3000/about',
      image: '/color-2174065_640.png'
    },
    {
      title: 'this is a project',
      description: 'this is a project I\'ve been working on',
      link: 'http://127.0.0.1:3000/about',
      image: '/color-2174065_640.png'
    },
    
  ]


  const [posts, setPosts] = useState(null)

  const portfolio = useRef(null)

  const executeScroll = () => {
    portfolio.current.scrollIntoView()
  }

  useEffect(() => {
    if(posts === null) {
      fetch(`http://${window.location.host}/api/blog/posts`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setPosts(json);
      });
    }
  }, [posts, setPosts])

  function ActiveLink({ children, href }) {
    const router = useRouter()
    const style = {
      marginRight: 10,
      color: 'blue',
    }
  
    const handleClick = (e) => {
      e.preventDefault()
      router.push(href)
    }
  
    return (
      <a href={href} onClick={handleClick} style={style}>
        {children}
      </a>
    )
  }

  return (
    <main>
      <div className="focal">
        <Navigation style={{position: 'absolute', zIndex: 1, width: '100vw'}}/>
        <div className="focal-background">
        </div>
        <div className="focal-focus">
          <span style={{fontWeight: 400}}>I'm a </span>
          <Typist >
            <span style={{fontWeight: 400}}>Full Stack Developer</span>
          </Typist>

          <h4 style={{fontWeight: 300}}>designing & building exceptional projects</h4>

          <div className="go-to-portfolio">
            <div className="go-to-portfolio-flex" onClick={executeScroll}>

              <div className="go-to-one" > 
                view portfolio
              </div>

              <div className="go-to-two" >
                <Down/>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="porfolio-container">
        <div className="portfolio" ref={portfolio}>
          <center>
            <h3>My Recent Work</h3>
            <h5 style={{fontWeight: 200, color: '#141c3a'}}>Here are a few projects I've worked on recently</h5>
          </center>
          <div className="portfolio-flex">
            {
              work.map((item) => (
                <div className="project-container">
                  <div className="project-image" style={{backgroundImage: `url(${item.image})`}} />
                  <div style={{zIndex: 1}} className="project-text-container">
                    <h6 className="project-description">{item.description}</h6>
                    <a className="project-visit" href={item.link} target="_blank">visit website <Right size={12}/></a>

                  </div>

                </div>
              ))
            }
          </div>
          
        </div>
      </div>


      <div className="blog-posts-container">
        <center>
          <h3>Blog</h3>
          <h5 style={{fontWeight: 200, color: '#141c3a'}}>Sometimes I talk about stuff</h5>

        </center>

          {posts === null ?
            <center>
              <Spinner animation="border" variant="primary" />

            </center>

          : 
            <div className="blog-posts" style={{borderRadius: '6px'}}>
              {
                posts.map((item) => (
                  <Card style={{ width: '100%' }}>
                    <Card.Body>
                      <Card.Title>
                        <ActiveLink href={`http://${window.location.host}/blog/post/${item.id}`}>
                          {item.title}
                        </ActiveLink>
                          
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.date}</Card.Subtitle>
                      <Card.Text style={{width: '50%'}}>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          }
      </div>
      <div className="contact">
        <h1>Let's Work Together</h1>
        <h4>Have a project you'd like to discuss?</h4>
        <div className="touch-me-container">
          <a className="touch-me" href='http://127.0.0.1:3000/contact'>Get in Touch</a>
        </div>
      </div>
      <footer style={{
            backgroundColor: '#212529', 
            color: 'white', 
            padding: '10px',
            bottom: 0,
            width: '100%',
        }}>
            <center>
            <a>© 2021 Dylan Muraco. All rights reserved.</a>
            </center>
        </footer>
    </main>
  )
}
