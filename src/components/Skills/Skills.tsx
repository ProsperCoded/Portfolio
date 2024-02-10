import * as Technologies from "../Projects/Technologies";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";
import { useEffect, useId, useState } from "react";
import { TechnologyInstance } from "../../types";
import AOS from "aos";
import "aos/dist/aos.css";

function Skills() {
  const FrontendSkills: [
    ({ displayCaption }: TechnologyInstance) => JSX.Element,
    number
  ][] = [
    [Technologies.React, 90],
    [Technologies.Javascript, 90],
    [Technologies.Sass, 80],
    [Technologies.TypeScript, 80],
    [Technologies.Vite, 70],
    [Technologies.Vue, 75],
    [Technologies.NPM, 75],
    [Technologies.AntJS, 60],
    [Technologies.TailwindCSS, 50],
    [Technologies.Lodash, 60],
    [Technologies.HTML, 95],
    [Technologies.CSS, 80],
  ];
  const BackendSkills: [
    ({ displayCaption }: TechnologyInstance) => JSX.Element,
    number
  ][] = [
    [Technologies.Express, 90],
    [Technologies.MongoDB, 90],
    [Technologies.Node, 80],
    [Technologies.NPM, 80],
  ];
  const RelatedSkills: [
    ({ displayCaption }: TechnologyInstance) => JSX.Element,
    number
  ][] = [
    [Technologies.Git, 80],
    [Technologies.GitHub, 90],
    [Technologies.Node, 80],
    [Technologies.NPM, 95],
    [Technologies.XD, 90],
  ];
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      className="skills"
      id="skills"
      data-aos="fade-up"
      // data-aos-duration="3000"
    >
      <h1 className="skills__heading">Skills</h1>
      <div className="skills__categories">
        <div
          className="skills__category"
          data-aos="fade-right"
          data-aos-anchor-placement="left-bottom"
          data-aos-duration="800"
        >
          <header>
            <i className="bi bi-code-slash"></i>

            <h3 className="heading">Frontend Development</h3>
          </header>
          <p className="content">
            <span className="tint" data-tint={"primary"}>
              {"<div>"}
            </span>
            <p>
              {" "}
              I major in Frontend Development, with a keen eye for design and
              user experience fully capable of building responsive and reactive
              websites Websites with User Centric Design. I understand the
              importance Performance in the Software Development and i ensure my
              applications meet PWAs Standards.
            </p>
            <span className="tint" data-tint={"primary"}>
              {"</div>"}
            </span>
          </p>
          <ul className="category__skill-list">
            {FrontendSkills.map((Tech) => {
              return (
                <li className="skill-list-item" key={useId()}>
                  <Skill Technology={Tech[0]} Percentage={Tech[1]} />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="skills__category"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1000"
        >
          <header>
            <i className="bi bi-braces"></i>

            <h3 className="heading">Backend Development</h3>
          </header>
          <p className="content">
            <span className="tint" data-tint={"primary"}>
              {"{"}
            </span>
            <p>
              {" "}
              I highly enjoy building scalable and automated systems,
              interacting with and managing database authentication and
              authorization, I have experience building and testing Rest APIs ,
              Node.js, and JSON to facilitate data and communication between the
              frontend and the backend.
            </p>
            <span className="tint" data-tint={"primary"}>
              {"}"}
            </span>
          </p>
          <ul className="category__skill-list">
            {BackendSkills.map((Tech) => {
              return (
                <li className="skill-list-item" key={useId()}>
                  <Skill Technology={Tech[0]} Percentage={Tech[1]} />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="skills__category"
          data-aos="fade-left"
          data-aos-anchor-placement="right-bottom"
          data-aos-duration="1200"
        >
          <header>
            <i className="bi bi-braces-asterisk"></i>

            <h3 className="heading">Related Skills</h3>
          </header>
          <p className="content">
            <span className="tint" data-tint={"primary"}>
              {"["}
            </span>
            <p>
              I am a versatile and adaptable full stack developer who can handle
              both the frontend and the backend of web development. I am
              familiar with common stacks such as NextJS and I genuinely enjoy
              solving complex problems. I also follow web development best
              practices, such as version control, testing, debugging, and
              security. I am always eager to learn new skills and technologies
              to improve my craft.
            </p>
            <span className="tint" data-tint={"primary"}>
              {"]"}
            </span>
          </p>
          <ul className="category__skill-list">
            {RelatedSkills.map((Tech) => {
              return (
                <li className="skill-list-item" key={useId()}>
                  <Skill Technology={Tech[0]} Percentage={Tech[1]} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Skill({
  Technology,
  Percentage,
}: {
  Technology: ({ displayCaption }: TechnologyInstance) => JSX.Element;
  Percentage: number;
}) {
  return (
    <div className="skill">
      <Technology displayCaption={true} />
      <div className="progress">
        <CircularProgressAnimated value={Percentage} />
      </div>
    </div>
  );
}

function CircularProgressAnimated({ value }: { value: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting: isLoading,
    duration: 2,
    start: 0,
    end: value,
    onComplete: () => {
      setIsLoading(false);
    },
  });
  return (
    <CircularProgress
      size="md"
      variant="outlined"
      determinate
      value={value1 as number}
    >
      <Typography>{value1}%</Typography>
    </CircularProgress>
  );
}

function category({
  tintText,
  tintData,
  content,
  heading,
}: {
  tintText: string;
  tintData: string;
  content: JSX.Element;
  heading: string;
}) {
  return (
    <div className="skills__category">
      <header>
        <i className="bi bi-braces"></i>
        <h3 className="heading">{heading}</h3>
      </header>
      <p className="content">
        <span className="tint" data-tint={tintText}>
          {tintData}
        </span>
        {content}
        <span className="tint" data-tint={tintText}>
          {tintData}
        </span>
      </p>
    </div>
  );
}
export default Skills;
