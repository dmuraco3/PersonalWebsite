import { useRouter } from "next/router";

import styles from "./Project.module.scss";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";

export default function Project({ project }) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <main>
      <div className={styles.ProjectContainer}>
        <div className={styles.TitleContainer}>
          <h1 className={styles.Title}>{project.title}</h1>
        </div>
        <div className={styles.DateContainer}>
          <span className={styles.Date}>
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.ImageContainer}>
          <Image
            src={project.image}
            className={styles.Image}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.ProjectBody}>
          <div className={styles.DescriptionContainer}>
            <p className={styles.Description}>{project.description}</p>
          </div>
          <div className={styles.BodyContainer}>
            {ReactHtmlParser(project.body)}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  let { slug } = context.query;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/projects/${slug}`
  );
  const project = await res.json();
  if (project) {
    return {
      props: {
        project
      }
    };
  }
}
