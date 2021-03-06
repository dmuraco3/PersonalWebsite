import Styles from "./about.module.scss";
import Image from "next/image";
import { FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";
export default function About() {
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.center}>
          <div className={Styles.AboutHeader}>
            <h1>Who Am I?</h1>

          </div>
          <div className={Styles.AboutBody}>
            <div className={Styles.container}>
              <div className={Styles.ProfilePicContainer}>
                <Image
                  src="/ProfilePig.jpg"
                  className={Styles.ProfilePic}
                  layout="fill"
                  objectFit="cover"
                  alt="Profile Pic"
                />
              </div>
            </div>
            <div className={Styles.container}>
              <div className={Styles.socialHandles}>
                <a
                  href="https://twitter.com/MuracoDylan"
                  target="_blank"
                  rel="noreferrer"
                  className={Styles.SocialHandle}
                >
                  <FaTwitter size={30} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCF-V-KW5-Cd-QUvkiBYTcFg"
                  target="_blank"
                  rel="noreferrer"
                  className={Styles.SocialHandle}
                >
                  <FaYoutube size={60} color="#FF0000"/>
                </a>
                <a
                  href="https://github.com/dmuraco3"
                  target="_blank"
                  rel="noreferrer"
                  className={Styles.SocialHandle}
                >
                  <FaGithub size={30} />
                </a>
              </div>
            </div>
            <div className={Styles.container}>
              <div className={Styles.AboutMe}>
                <p> I am developer</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
