// import { KUTE } from "./../../kute.js";
function Main() {
  return (
    <div className="main ">
      <div className="main__content container-curve">
        <div className="main__heading">
          <h1 className="main__title">Hello, My name is</h1>
          <span className="main__name">Prosper Enwerem</span>
        </div>
        <BlobAnimation />
        <div className="main__info">
          <h2 className="main__profession">I am a Developer</h2>
          <p className="main__description">
            I am not just a Full Stack Web Developer; I am a digital creator
            passionate about bringing visions to life. With a keen eye for
            aesthetics and a dedication to user-centric and SEO-friendly design,
            I specialize in creating websites that not only look good but also
            perform exceptionally well. From crafting simple static sites to
            managing intricate blog platforms and building scalable agency
            websites, I am committed to delivering digital solutions that leave
            a lasting impact.
          </p>
          <div className="main__actions">
            <a href="#resume" className="btn btn--twist">
              Download CV
            </a>

            {/* <a href="application">A</a> */}

            <button className="btn btn--twist main__cta">Hire Me</button>
          </div>
        </div>
      </div>
      <div className="main__dividers">
        <div>
          <div className="main__divider"></div>
          <div className="main__divider"></div>
        </div>
      </div>
    </div>
  );
}
function BlobAnimation() {
  return (
    <div className="ImageBlob">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="350.859"
        height="283.588"
        viewBox="0 0 350.859 283.588"
      >
        <g
          id="blob-haikei_1_"
          data-name="blob-haikei (1)"
          transform="translate(166.228 252.764)"
        >
          <path
            id="blob1"
            data-name="blob1"
            d="M72.809-184.316c34.184,22.061,56.951,63.163,52.371,100.137S88.6-14.422,54.418,4.928C20.233,24.216-16.139,30.008-53.4,30.748c-37.193.739-75.274-3.636-92.366-22.924s-13.2-53.612-15.793-90.216S-173.114-157.88-156.022-180c17.092-22.061,60.233-27.3,104.673-28.408,44.371-1.048,89.973,1.972,124.158,24.095"
            fill="#fff"
          />
        </g>
        <g
          transform="translate(224.631 147.371)"
          style={{ visibility: "hidden" }}
        >
          <path
            id="blob2"
            data-name="Path 18"
            d="M37.164-103.577C71.279-81.591,115.4-56.62,124.423-22.305s-16.982,78.053-51.1,101.217S-3.017,104.668-42.515,101.919s-76.267-10.993-103.332-34.158C-172.835,44.6-190.12,6.513-186.178-27.566c3.866-34.079,29.036-64.075,56.1-86.062,26.989-21.987,55.949-35.964,82.483-33.451s50.642,21.516,84.758,43.5"
            fill="#fff"
          />
        </g>
      </svg> */}
      {/* <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="c" gradientTransform="rotate(-30 .5 .5)">
            <stop offset="0%" stop-color="#FFE53B" />
            <stop offset="100%" stop-color="#FF2525" />
          </linearGradient>
          <clipPath id="b">
            <path
              fill="currentColor"
              d="M750.5 647Q734 794 586 783t-330.5-44Q73 706 120.5 523T307 302q139-38 272-53t160.5 118q27.5 133 11 280Z"
            />
          </clipPath>
          <filter id="a" x="-50vw" y="-50vh" width="100vw" height="100vh">
            <feFlood flood-color="#fff" result="neutral-gray" />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="2.5"
              numOctaves="100"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="destaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="theNoise">
              <feFuncA type="table" tableValues="0 0 0.1 0" />
            </feComponentTransfer>
            <feBlend
              in="SourceGraphic"
              in2="theNoise"
              mode="soft-light"
              result="noisy-image"
            />
          </filter>
        </defs>
        <g filter="url(#a)" clip-path="url(#b)">
          <path
            fill="url(#c)"
            d="M750.5 647Q734 794 586 783t-330.5-44Q73 706 120.5 523T307 302q139-38 272-53t160.5 118q27.5 133 11 280Z"
          />
        </g>
      </svg> */}
      <img
        src="./static/profile.png"
        alt="Profile Picture"
        // style={{ width: "100%" }}
      />
    </div>
  );
}

export default Main;
