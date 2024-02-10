import { ProjectsData } from "../components/Projects/Projects";
import Page from "./Page";
import { useParams } from "react-router-dom";
function ProjectProcess() {
  const id = parseInt((useParams() as { id: string }).id);
  const project = ProjectsData[id];
  return (
    <Page
      icon={project.icon}
      heading={project.title}
      subHeading={
        <h3 className="sub-heading">
          <a
            className="project__web-link"
            target="_blank"
            rel="noopener noreferrer"
            href={project.link}
          >
            {project.link}
          </a>
          <p> {project.description}</p>
        </h3>
      }
      className={"project-page"}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius minus quae
        a blanditiis quaerat atque quod praesentium odio! Quisquam labore ullam
        itaque minima animi! Laborum, quaerat necessitatibus deserunt in
        repellendus amet nisi reprehenderit! Voluptatibus similique blanditiis
        placeat autem, aut possimus nisi molestias quia adipisci nulla
        recusandae asperiores eius esse, suscipit ipsam magnam commodi ipsum
        harum! Reiciendis similique praesentium officia nemo, vitae voluptatibus
        temporibus! Quos dignissimos distinctio consequuntur natus sit, mollitia
        quas eveniet enim beatae veritatis facilis ipsum veniam corrupti
        dolores! Praesentium dicta sit assumenda consequuntur quam veritatis
        soluta, itaque a. Sapiente laboriosam quidem distinctio optio at autem
        expedita reprehenderit itaque.
      </p>
    </Page>
  );
}

export default ProjectProcess;
