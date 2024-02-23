import { Tooltip } from "antd";
import { useContext, useEffect, useId, useRef } from "react";
import {
  GetTechComponent,
  Javascript,
  React,
  Sass,
  TypeScript,
  Vite,
  Vue,
} from "./Technologies";
// General Imports
import gitHubIcon from "./assets/icons/github.webp";
// weatherlyX
import { Link } from "react-router-dom";
import { ProjectDataType, TechnologyType } from "../../types";
import AOS from "aos";
import { PROJECTS_CONTEXT, isDesktop } from "../../App";

function Projects() {
  const [projectsData] = useContext(PROJECTS_CONTEXT);
  return (
    <div className="projects" id="projects">
      <h1 className="projects__heading">Projects</h1>
      <div className="projects__items">
        {projectsData.map((data, index) => (
          <Project
            id={index}
            key={index}
            title={data.title}
            link={data.link}
            description={data.description}
            githubRepo={data.gitHubRepo}
            technologies={data.technologies}
            interface={data.interface}
            icon={data.icon}
          />
        ))}
      </div>
    </div>
  );
}
type ProjectProps = {
  title: string;
  description: string;
  interface: string;
  icon: string;
  link: string;
  githubRepo: string;
  technologies: TechnologyType[];
  id: number;
};
function Project(props: ProjectProps) {
  const url = useRef(new URL(props.link));
  // const location = useLocation();
  useEffect(() => {
    isDesktop && AOS.init();
  }, []);
  return (
    <div className="project" data-aos={isDesktop && "flip-left"}>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <Tooltip
          title={`Visit ${props.title}`}
          arrow
          trigger={["hover"]}
          color="var(--color-secondary)"
        >
          <img
            className="project__icon"
            src={props.icon}
            alt={"Click to visit " + props.title}
          ></img>
        </Tooltip>
      </a>
      <Tooltip
        title={"Click to view development Process"}
        arrow
        trigger={["hover"]}
        color="var(--color-secondary)"
      >
        <Link to={`/project/${props.id}`} style={{ textDecoration: "none" }}>
          <div className="project__image">
            <img alt="project__image" src={props.interface} />
          </div>
          <h1 className="project__title">{props.title}</h1>
        </Link>
      </Tooltip>
      <a
        className="project__link"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url.current.host}
      </a>
      <p className="project__description">{props.description}</p>
      <a
        className="project__link-repo"
        href={props.githubRepo}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={gitHubIcon} alt="github" />
      </a>
      <h2 className="project__technologies">Technologies</h2>
      <ul className="project__technologies-list">
        {props.technologies.map((tech) => {
          return (
            <li className="project_technologies_list-item" key={useId()}>
              {GetTechComponent(tech)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Projects;
