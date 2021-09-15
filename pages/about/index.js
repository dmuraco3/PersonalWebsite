import Navigation from "components/navbar";
import Styles from './about.module.scss'
import Footer from 'components/Footer'
import {FaTwitter, FaYoutube, FaGithub} from 'react-icons/fa'
export default function About() {
  return (
    <>
      <Navigation />
        <div className={Styles.main}>
          <div className={Styles.center} >
            <h1>Who Am I?</h1>
            <div>

              <div className={Styles.container}>
                <div className={Styles.ProfilePicContainer}>
                  <img src="/ProfilePig.jpg" className={Styles.ProfilePic}width="100%" alt="Profile Pic"/>
                </div>
              </div>
              <div className={Styles.container} >

                <div className={Styles.socialHandles}>
                  <a href="https://twitter.com/MuracoDylan" target="_blank" className={Styles.SocialHandle}>
                    <FaTwitter size={30}/>
                  </a>
                  <a href="https://www.youtube.com/channel/UCF-V-KW5-Cd-QUvkiBYTcFg" target="_blank" className={Styles.SocialHandle}>
                    <FaYoutube size={60} />
                  </a>
                  <a href="https://github.com/dmuraco3" target="_blank" className={Styles.SocialHandle}>
                    <FaGithub size={30} />

                  </a>
                </div>

              </div>
              <div className={Styles.container} >
                <p>I am developer </p>

              </div>

              <div className={Styles.container}>
                <h2>My Skills</h2>
              </div>
            </div>
          </div>
        </div>  
      {/* <Footer /> */}
    </>
  );
}
