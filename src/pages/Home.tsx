import Main from "../components/Main/Main";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";

function Home() {
  return (
    <div className="home">
      {/* <Nav /> */}
      <Main />
      <div>
        <Projects />
        <About />
      </div>
    </div>
  );
}

export default Home;
