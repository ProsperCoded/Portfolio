import Main from "../components/Main/Main.tsx";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";

function Home() {
  return (
    <div className="home">
      {/* <Nav /> */}
      <Main />
      <Skills />
      <div>
        <Projects />
        <About />
      </div>
    </div>
  );
}

export default Home;
