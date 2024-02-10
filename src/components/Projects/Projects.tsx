import { Tooltip } from "antd";
import { useId, useRef } from "react";
import { Javascript, React, Sass, TypeScript, Vite, Vue } from "./Technologies";
// General Imports
import gitHubIcon from "./assets/icons/github.webp";
// weatherlyX
import WeatherlyX_InterfaceImage from "./assets/weatherlyx/interface.webp";
import WeatherlyX_Logo from "./assets/weatherlyx/logo.webp";

import PlayerCoded_Interface from "./assets/playercoded/interface.webp";
import PlayerCoded_Logo from "./assets/playercoded/logo.webp";

import CalcCoded_Interface from "./assets/calccoded/interface.webp";
import CalcCoded_Logo from "./assets/calccoded/logo.webp";
import { Link } from "react-router-dom";
import { ProjectDataType } from "../../types";

export const ProjectsData: ProjectDataType[] = [
  {
    title: "Weatherlyx",
    link: "https://weatherlyx.netlify.app",
    description:
      "A reliable weather app that uses the OpenWeather API to display the current weather in your browser",
    imageInterface: WeatherlyX_InterfaceImage,
    icon: WeatherlyX_Logo,
    githubRepo: "https://github.com/prospercoded/weatherlyx",
    Technologies: [React, TypeScript, Sass],
  },
  {
    title: "Player Coded",
    link: "https://playercoded.netlify.app",
    description:
      "A Versatile music player and explorer, You can search for any track & album and Listen to a 30min Preview",
    imageInterface: PlayerCoded_Interface,
    icon: PlayerCoded_Logo,
    githubRepo: "https://github.com/prospercoded/playercoded",
    Technologies: [Sass, Javascript],
  },
  {
    title: "Calc Coded",
    link: "https://calccoded.netlify.app",
    description: "A simple calculator With elegant design For ease of use",
    imageInterface: CalcCoded_Interface,
    icon: CalcCoded_Logo,
    githubRepo: "https://github.com/prospercoded/calccoded",
    Technologies: [Vite, Javascript, Vue],
  },
];

function Projects() {
  return (
    <div className="projects" id="projects">
      <h1 className="projects__heading">Projects</h1>
      <div className="projects__items">
        {ProjectsData.map((data, index) => (
          <Project
            id={index}
            key={index}
            title={data.title}
            link={data.link}
            description={data.description}
            githubRepo={data.githubRepo}
            Technologies={data.Technologies}
            imageInterface={data.imageInterface}
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
  imageInterface: string;
  icon: string;
  link: string;
  githubRepo: string;
  Technologies: React.ElementType[];
  id: number;
};
function Project(props: ProjectProps) {
  const url = useRef(new URL(props.link));
  // const location = useLocation();
  return (
    <div className="project">
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <Tooltip
          title={`Visit ${props.title}`}
          arrow
          trigger={["hover"]}
          color="var(--color-dark)"
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
        color="var(--color-dark)"
      >
        <Link to={`/project/${props.id}`} style={{ textDecoration: "none" }}>
          <div className="project__image">
            <img alt="project__image" src={props.imageInterface} />
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
        {props.Technologies.map((Tech) => {
          return (
            <li className="project_technologies_list-item" key={useId()}>
              <Tech />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Projects;
