import Main from "../components/Main/Main.tsx";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import React from "react";
import { Suspense } from "react";
// import Projects from "../components/Projects/Projects";
const Projects = React.lazy(() => import("../components/Projects/Projects"));

function Home() {
  return (
    <div className="home">
      {/* <Nav /> */}
      <Main />
      <Skills />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Projects />
        </Suspense>
        <About />
      </div>
    </div>
  );
}

export default Home;
