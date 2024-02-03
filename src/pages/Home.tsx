import Main from "../components/Main/Main";
import Nav from "../components/Nav/Nav";
import Projects from "../components/Projects/Projects";

function Home() {
  return (
    <div className="home">
      <Nav />
      <Main />
      <Projects />
    </div>
  );
}

export default Home;
