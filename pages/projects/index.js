import { useState, useEffect } from "react";
import styles from "./projects.module.scss";

import Image from "next/image";

import {getProjects} from 'helpers/Posts'

export default function Projects({ projects }) {
  const [evenProjects, setEvenProjects] = useState([]);
  const [oddProjects, setOddProjects] = useState([]);

  const projectsParser = (projects) => {
    console.log(projects);
    projects.forEach((project, index) => {
      if (index % 2 === 0) {
        setEvenProjects((evenProjects) => [...evenProjects, project]);
      } else if (index % 2 !== 0) {
        setOddProjects((oddProjects) => [...oddProjects, project]);
      }
    });
  };
  useEffect(() => {
    if (projects && oddProjects.length === 0) {
      projectsParser(projects);
    }
  }, [projects, oddProjects]);

  const ProjectCard = ({ project, index }) => {
    return (
      <div className={styles.ProjectContainer}>
        <div className={styles.ProjectCard}>
          <div className={styles.CardHeader}>
            <div className={styles.ProjectTitleContainer}>
              <h1 className={styles.ProjectTitle}>{project.title}</h1>
            </div>
            <div className={styles.ProjectDateContainer}>
              <span className={styles.ProjectDate}>
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className={styles.CardBody}>
            <div className={styles.ProjectImageContainer}>
              <Image
                className={styles.ProjectImage}
                src={project.image}
                layout="fill"
                alt={project.title}
                objectFit="cover"
              />
            </div>
            <div className={styles.ProjectDescriptionContainer}>
              <p className={styles.ProjectDescription}>{project.description}</p>
              <a
                href={`${process.env.NEXT_PUBLIC_URL}/projects/${project.id}`}
                target="_blank"
                rel="noreferrer"
              >
                More Info...
              </a>
            </div>
            <div className={styles.ProjectLinksContainer}>
              <a
                className={styles.WebsiteLink}
                target="_blank"
                rel="noreferrer"
                href={project.link}
              >
                Visit Website
              </a>
              <a
                className={styles.GithubLink}
                target="_blank"
                rel="noreferrer"
                href={project.codeLink}
              >
                View on Github
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className={styles.ProjectsContainer}>
        <div className={styles.MobileProjects}>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
        </div>
        <div className={styles.DesktopProjects}>
          <div className={styles.Left}>
            {evenProjects &&
              evenProjects.map((project, index) => (
                <ProjectCard project={project} key={index} />
              ))}
          </div>
          <div className={styles.Right}>
            {oddProjects &&
              oddProjects.map((project, index) => (
                <ProjectCard project={project} key={index} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  const projects = await getProjects();
  if (!projects) {
    return {
      notFound: true
    };
  } else {
    return {
      props: {
        projects
      },
      revalidate: 5
    };
  }
}
