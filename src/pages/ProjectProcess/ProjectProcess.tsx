// import { ProjectsData } from "../components/Projects/Projects";
import { useContext } from "react";
import { PROJECTS_CONTEXT } from "../../App";
import Page from "../Page";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
function ProjectProcess() {
  const id = parseInt((useParams() as { id: string }).id);
  const [ProjectsData] = useContext(PROJECTS_CONTEXT);
  const project = ProjectsData[id];
  return (
    <Page
      icon={project.icon}
      heading={project.title}
      subHeading={
        <h3 className="short-heading">
          <a
            className="project__web-link"
            target="_blank"
            rel="noopener noreferrer"
            href={project.link}
          >
            Visit Website
          </a>
          <p> {project.description}</p>
        </h3>
      }
      className={"project-process-page"}
    >
      <div style={{ width: "100%" }}>
        <Markdown remarkPlugins={[remarkGfm]}>{project.devProcess}</Markdown>
      </div>
    </Page>
  );
}

export default ProjectProcess;
