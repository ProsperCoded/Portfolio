import { useEffect } from "react";
import AboutPage from "../../pages/About";
import AOS from "aos";
import { isDesktop } from "../../App";

function About() {
  useEffect(() => {
    isDesktop && AOS.init();
  }, []);
  return (
    <section
      className="about"
      data-aos={isDesktop && "fade-left"}
      data-aos-anchor-placement="left"
      data-aos-duration="1500"
    >
      <AboutPage brief={true} />
    </section>
  );
}

export default About;
