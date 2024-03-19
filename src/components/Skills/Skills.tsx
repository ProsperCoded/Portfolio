import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { useCountUp } from "use-count-up";
import { TechnologyInstance, TechnologyType } from "../../types";
import * as Technologies from "../Projects/Technologies";
import { SKILLS_CONTEXT, isDesktop } from "../../App";
import _ from "lodash";
import { GetTechComponent } from "../Projects/Technologies";

function Skills() {
  const [skillsData, setSkillsData] = useContext(SKILLS_CONTEXT);
  let skillsByCategory = useMemo(
    () => _.groupBy(skillsData, "category"),
    [skillsData]
  );
  console.log("categorized, ", skillsByCategory);
  const FrontendSkills = skillsByCategory["frontend"] || [];
  const BackendSkills = skillsByCategory["backend"] || [];
  const RelatedSkills = skillsByCategory["related"] || [];
  // const FrontendSkills: [
  //   ({ displayCaption }: TechnologyInstance) => JSX.Element,
  //   number
  // ][] = [
  //   [Technologies.React, 90],
  //   [Technologies.Javascript, 90],
  //   [Technologies.Sass, 80],
  //   [Technologies.TypeScript, 80],
  //   [Technologies.Vite, 70],
  //   [Technologies.Vue, 75],
  //   [Technologies.NPM, 75],
  //   [Technologies.AntJS, 60],
  //   [Technologies.TailwindCSS, 50],
  //   [Technologies.Lodash, 60],
  //   [Technologies.HTML, 95],
  //   [Technologies.CSS, 80],
  // ];
  // const BackendSkills: [
  //   ({ displayCaption }: TechnologyInstance) => JSX.Element,
  //   number
  // ][] = [
  //   [Technologies.Express, 90],
  //   [Technologies.MongoDB, 90],
  //   [Technologies.Node, 80],
  //   [Technologies.NPM, 80],
  // ];
  // const RelatedSkills: [
  //   ({ displayCaption }: TechnologyInstance) => JSX.Element,
  //   number
  // ][] = [
  //   [Technologies.Git, 80],
  //   [Technologies.GitHub, 90],
  //   [Technologies.Node, 80],
  //   [Technologies.NPM, 95],
  //   [Technologies.XD, 90],
  // ];
  useEffect(() => {
    isDesktop && AOS.init();
  }, []);
  return (
    <section className="skills" id="skills" data-aos={isDesktop && "fade-up"}>
      <h1 className="skills__heading">Skills</h1>
      <div className="skills__categories">
        <div
          className="skills__category"
          data-aos={isDesktop && "fade-right"}
          data-aos-anchor-placement={isDesktop && "left-bottom"}
          data-aos-duration={isDesktop && "800"}
        >
          <header>
            <i className="bi bi-code-slash"></i>

            <h3 className="heading">Frontend Development</h3>
          </header>
          <div className="content">
            <span className="tint" data-tint={"primary"}>
              {"<div>"}
            </span>
            <p>
              I major in Frontend Development, with a keen eye for design and
              user experience fully capable of building responsive and reactive
              websites Websites with User Centric Design. I understand the
              importance Performance in the Software Development and i ensure my
              applications meet PWAs Standards.
            </p>
            <span className="tint" data-tint={"primary"}>
              {"</div>"}
            </span>
          </div>
          <ul className="category__skill-list">
            {FrontendSkills.map((Tech, index) => {
              return (
                <li className="skill-list-item" key={index}>
                  <Skill
                    Technology={Tech.technology}
                    Percentage={Tech.mastery}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="skills__category"
          data-aos={isDesktop && "fade-up"}
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1000"
        >
          <header>
            <i className="bi bi-braces"></i>

            <h3 className="heading">Backend Development</h3>
          </header>
          <div className="content">
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
          </div>
          <ul className="category__skill-list">
            {BackendSkills.map((Tech, index) => {
              return (
                <li className="skill-list-item" key={index}>
                  <Skill
                    Technology={Tech.technology}
                    Percentage={Tech.mastery}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="skills__category"
          data-aos={isDesktop && "fade-left"}
          data-aos-anchor-placement="right-bottom"
          data-aos-duration="1200"
        >
          <header>
            <i className="bi bi-braces-asterisk"></i>

            <h3 className="heading">Related Skills</h3>
          </header>
          <div className="content">
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
          </div>
          <ul className="category__skill-list">
            {RelatedSkills.map((Tech, index) => {
              return (
                <li className="skill-list-item" key={index}>
                  <Skill
                    Technology={Tech.technology}
                    Percentage={Tech.mastery}
                  />
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
  Technology: TechnologyType;
  Percentage: number;
}) {
  const skillRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const MonitorSkills = new IntersectionObserver(
      (elements) => {
        if (elements[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          unObserve();
        }
      },
      {
        threshold: 1,
        rootMargin: "3%",
      }
    );
    MonitorSkills.observe(skillRef.current!);
    function unObserve() {
      MonitorSkills.unobserve(skillRef.current!);
    }
  }, []);
  return (
    <div className="skill" ref={skillRef}>
      {GetTechComponent(Technology, true)}
      <div className="progress">
        <CircularProgressAnimated
          value={Percentage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

function CircularProgressAnimated({
  value,
  isLoading,
  setIsLoading,
}: {
  value: number;
  isLoading: boolean;
  setIsLoading: Function;
}) {
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
      value={parseInt(value1!.toString()) as number}
    >
      <Typography>{value1}%</Typography>
    </CircularProgress>
  );
}

export default Skills;
