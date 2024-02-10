import { useEffect } from "react";
import AboutPage from "../../pages/About";
import AOS from "aos";

function About() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section
      className="about"
      data-aos="fade-left"
      data-aos-anchor-placement="left"
      data-aos-duration="1500"
    >
      <AboutPage brief={true} />
    </section>
  );
}

export default About;
