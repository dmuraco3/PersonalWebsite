import { useState, useEffect } from 'react';
import Navigation from '../../components/navbar'
import styles from './projects.module.scss';

import Image from 'next/image'

import Footer from 'components/Footer';

export default function Projects() {
    const [projects, setProjects] = useState();
    const [evenProjects, setEvenProjects] = useState([]);
    const [oddProjects, setOddProjects] = useState([]);

    const projectsParser = (projects) => {
        projects.forEach((project, index) => {
            if(index % 2 === 0){
                setEvenProjects(evenProjects => [...evenProjects, project])
            } else if(index % 2 !== 0) {
                setOddProjects(oddProjects => [...oddProjects, project])
            }
        })
    }
    useEffect(() => {
        if(!projects) {
            fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`)
                .then(res => res.json())
                .then(data => {
                    setProjects(data);
                    projectsParser(data);
                    console.log(data)
                })
                .catch(err => console.log(err))

        }
    })
    return (
        <main>
            <Navigation />
            <div className={styles.ProjectsContainer}>
                <div className={styles.MobileProjects}>
                    {projects && projects.map((project, index) => (
                        <div className={styles.ProjectContainer} key={index}>
                            <div className={styles.ProjectCard} >
                                <div className={styles.CardHeader}>
                                    <div className={styles.ProjectTitleContainer}>
                                        <h1 className={styles.ProjectTitle}>{project.title}</h1>
                                    </div>
                                    <div className={styles.ProjectDateContainer}>
                                        <span className={styles.ProjectDate}>{new Date(project.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className={styles.CardBody}>
                                    <div className={styles.ProjectDescriptionContainer}>
                                        <p className={styles.ProjectDescription}>{project.description}</p>
                                    </div>
                                    <div className={styles.ProjectImageContainer}>
                                        <Image className={styles.ProjectImage} src={project.image} width="100%" alt={project.title} />
                                    </div>
                                    <div className={styles.ProjectLinksContainer}>
                                        <a className={styles.WebsiteLink} target="_blank" rel="noreferrer" href={project.link}>Visit Website</a>
                                        <a className={styles.GithubLink} target="_blank" rel="noreferrer" href={project.codeLink}>View on Github</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className={styles.DesktopProjects}>

                    <div className={styles.Left}>
                        {evenProjects && evenProjects.map((project, index) => (
                            <div className={styles.ProjectContainer} key={index}>
                                <div className={styles.ProjectCard} >
                                    <div className={styles.CardHeader}>
                                        <div className={styles.ProjectTitleContainer}>
                                            <h1 className={styles.ProjectTitle}>{project.title}</h1>
                                        </div>
                                        <div className={styles.ProjectDateContainer}>
                                            <span className={styles.ProjectDate}>{new Date(project.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={styles.CardBody}>
                                        <div className={styles.ProjectDescriptionContainer}>
                                            <p className={styles.ProjectDescription}>{project.description}</p>
                                        </div>
                                        <div className={styles.ProjectImageContainer}>
                                            <Image className={styles.ProjectImage} src={project.image} width="100%" alt={project.title} />
                                        </div>
                                        <div className={styles.ProjectLinksContainer}>
                                            <a className={styles.WebsiteLink} target="_blank" rel="noreferrer" href={project.link}>Visit Website</a>
                                            <a className={styles.GithubLink} target="_blank" rel="noreferrer" href={project.codeLink}>View on Github</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className={styles.Right}>
                        {oddProjects && oddProjects.map((project, index) => (
                            <div className={styles.ProjectContainer} key={index}>
                                <div className={styles.ProjectCard} >
                                    <div className={styles.CardHeader}>
                                        <div className={styles.ProjectTitleContainer}>
                                            <h1 className={styles.ProjectTitle}>{project.title}</h1>
                                        </div>
                                        <div className={styles.ProjectDateContainer}>
                                            <span className={styles.ProjectDate}>{new Date(project.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={styles.CardBody}>
                                        <div className={styles.ProjectDescriptionContainer}>
                                            <p className={styles.ProjectDescription}>{project.description}</p>
                                        </div>
                                        <div className={styles.ProjectImageContainer}>
                                            <Image className={styles.ProjectImage} src={project.image} width="100%" alt={project.title} />
                                        </div>
                                        <div className={styles.ProjectLinksContainer}>
                                            <a className={styles.WebsiteLink} target="_blank" rel="noreferrer" href={project.link}>Visit Website</a>
                                            <a className={styles.GithubLink} target="_blank" rel="noreferrer" href={project.codeLink}>View on Github</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}