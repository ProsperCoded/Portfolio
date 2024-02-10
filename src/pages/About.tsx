import { Link } from "react-router-dom";
import Page from "./Page";

function AboutPage({ brief = false }: { brief?: Boolean }) {
  return (
    <Page
      heading={"About"}
      className={"about-page"}
      subHeading={
        <h3 className="sub-heading">
          I am <span className="highlight">Prosper Coded </span>a Partner for
          Visionary Web Experiences
        </h3>
      }
    >
      <>
        <p>
          I am a passionate and results-driven Fullstack Developer with over a
          year of hands-on experience specializing in front-end development and
          possessing intermediate proficiency in backend technologies. Currently
          pursuing a Bachelor's degree in Computer Science, I have cemented my
          skills through extensive project work, demonstrating my commitment to
          delivering high-quality solutions.
        </p>
        {brief && (
          <Link to="/about" className="btn btn--twist">
            Learn More
          </Link>
        )}
        {!brief && (
          <p className="more-info">
            <h3 className="about__header-text highlight">Key Strengths</h3>
            <ol>
              <li>
                <b>Front-end Excellence:</b> Proficient in creating visually
                appealing and intuitive user interfaces, I excel in using the
                latest front-end technologies to enhance user experiences.
              </li>
              <li>
                <b>Backend Competence:</b> With a solid foundation in backend
                development, I bring forth the ability to design and implement
                scalable, efficient, and secure server-side solutions.
              </li>
              <li>
                <b>Project Portfolio:</b> My journey includes crafting diverse
                projects, showcasing my creativity and problem-solving skills.
                Each project reflects my dedication to pushing the boundaries of
                what technology can achieve.
              </li>
              <li>
                <b>Continuous Learning:</b> In the ever-evolving tech landscape,
                I stay committed to continuous learning, ensuring that my skills
                remain at the forefront of industry trends.
              </li>
            </ol>
            <h3 className="about__header-text highlight">Why Choose Me</h3>
            <ol>
              <li>
                <b>Proven Track Record:</b> My portfolio demonstrates a history
                of successfully completed projects, reflecting my commitment to
                delivering high-quality solutions on time and within budget.
              </li>
              <li>
                <b>Client-Centric Approach:</b> I understand the importance of
                aligning technological solutions with business goals. My
                client-centric approach ensures that the end product not only
                meets technical requirements but also addresses the unique needs
                of the business.
              </li>
              <li>
                <b>Collaborative Team Player:</b> Recognizing the importance of
                teamwork, I thrive in collaborative environments. I bring a
                positive attitude and effective communication skills to
                contribute to the success of any project.
              </li>
            </ol>
            <p className="conclusion">
              By combining my technical expertise, commitment to excellence, and
              a passion for creating impactful solutions, I am confident in my
              ability to contribute to the success of your projects. Let's
              embark on a journey of turning ideas into reality!
            </p>
          </p>
        )}
      </>
    </Page>
  );
}

export default AboutPage;
