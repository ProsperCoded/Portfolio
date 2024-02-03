import { useId, useRef } from "react";
import { React } from "./Technologies";
// General Imports
import gitHubIcon from "./assets/icons/github.webp";
// weatherlyX
import WeatherlyX_InterfaceImage from "./assets/weatherlyx/weatherlyx.webp";
import WeatherlyX_Icon from "./assets/weatherlyx/logo.webp";
function Projects() {
  return (
    <div className="projects">
      <h1 className="projects__heading">Projects</h1>
      <div className="projects__items">
        <Project
          title="Weatherlyx"
          link="https://weatherlyx.netlify.app"
          description=" A reliable weather app that uses the OpenWeather API to display the
  current weather in your browser."
          githubRepo="https://github.com/prospercoded/weatherlyx"
          Technologies={[React]}
          imageInterface={WeatherlyX_InterfaceImage}
          icon={WeatherlyX_Icon}
        />
        <Project
          title="Weatherlyx"
          link="https://weatherlyx.netlify.app"
          description=" A reliable weather app that uses the OpenWeather API to display the
  current weather in your browser."
          githubRepo="https://github.com/prospercoded/weatherlyx"
          Technologies={[React]}
          imageInterface={WeatherlyX_InterfaceImage}
          icon={WeatherlyX_Icon}
        />
        <Project
          title="Weatherlyx"
          link="https://weatherlyx.netlify.app"
          description=" A reliable weather app that uses the OpenWeather API to display the
  current weather in your browser."
          githubRepo="https://github.com/prospercoded/weatherlyx"
          Technologies={[React]}
          imageInterface={WeatherlyX_InterfaceImage}
          icon={WeatherlyX_Icon}
        />
        <Project
          title="Weatherlyx"
          link="https://weatherlyx.netlify.app"
          description=" A reliable weather app that uses the OpenWeather API to display the
  current weather in your browser."
          githubRepo="https://github.com/prospercoded/weatherlyx"
          Technologies={[React]}
          imageInterface={WeatherlyX_InterfaceImage}
          icon={WeatherlyX_Icon}
        />
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
};
function Project(props: ProjectProps) {
  const url = useRef(new URL(props.link));
  return (
    <div className="project">
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img
          className="project__icon"
          src={props.icon}
          alt={"Click to visit " + props.title}
        ></img>
      </a>
      <img
        alt="project__image"
        className="project__image"
        src={props.imageInterface}
      />
      <h1 className="project__title">Weatherlyx</h1>
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
