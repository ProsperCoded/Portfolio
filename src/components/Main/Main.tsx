import { Tooltip } from "antd";
import { useRef } from "react";
import { Link } from "react-router-dom";

function Main() {
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  return (
    <div className="main ">
      <div className="main__content container-curve">
        <header className="main__heading">
          <h1 className="main__title">Hello, My name is</h1>
          <span className="main__name highlight">Prosper Enwerem</span>
        </header>
        <BlobAnimation />
        <div className="main__info">
          <h2 className="main__profession">I am a Developer</h2>
          <p className="main__description">
            I am not just a{" "}
            <b className="highlight">Full Stack Web Developer</b>. I am a
            digital creator passionate about bringing visions to life. With a
            keen eye for aesthetics and a dedication to user-centric and
            SEO-friendly design, I specialize in creating websites that not only
            look good but also perform exceptionally well. From crafting simple
            static sites to managing intricate blog platforms and building
            scalable agency websites, I am committed to delivering digital
            solutions that leave a lasting impact.
          </p>
          <div className="main__actions">
            <Tooltip
              title="Right CLick to download CV"
              arrow
              color="var(--color-secondary)"
            >
              <a
                href="./static/resume.pdf"
                className="btn btn--twist"
                target="_blank"
                onContextMenu={(e) => {
                  downloadRef.current?.click();
                  e.preventDefault();
                }}
              >
                <i className="bi bi-file-earmark-person"></i>
                View / Download CV
              </a>

              <Link to="/services">Services</Link>
              <a
                href="./static/resume.pdf"
                className="d-none"
                ref={downloadRef}
                download
              ></a>
            </Tooltip>

            <a href="hire-me" className="btn btn--twist main__cta">
              Hire Me
            </a>
          </div>
        </div>
      </div>
      <div className="main__dividers">
        <div>
          <div className="main__divider"></div>
          <div className="main__divider"></div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "50%",
          top: "0",
          left: "0",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            className="circle-gradient"
            style={{ width: "15em", height: "15em", left: "30%", top: "-20%" }}
          ></div>
          <div
            className="circle-gradient"
            style={{
              width: "6em",
              height: "6em",
              left: "30%",
              transform: "translate(160%, -50%)",
              top: "10%",
              rotate: "30deg",
            }}
          ></div>
        </div>
      </div>
      <div
        className="circle-gradient"
        style={{
          width: "7rem",
          height: "7rem",
          bottom: "10%",
          rotate: "80deg",
          transform: "translate(50%, -50%)",
        }}
      ></div>
    </div>
  );
}
function BlobAnimation() {
  return (
    <div className="ImageBlob">
      <img src="./static/profile.png" alt="Profile Picture" />
    </div>
  );
}

export default Main;
