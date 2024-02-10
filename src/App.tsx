import "./styles/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AboutPage from "./pages/About.tsx";
import Nav from "./components/Nav/Nav.tsx";
import ProjectProcess from "./pages/ProjectProcess.tsx";
import { useEffect, useRef } from "react";

function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const currentScrollHeight = useRef(window.screenY);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      let newScrollHeight = window.scrollY;
      if (newScrollHeight > currentScrollHeight.current) {
        appRef.current?.classList.add("nav-hide");
      } else {
        appRef.current?.classList.remove("nav-hide");
      }
      currentScrollHeight.current = newScrollHeight;
    });
  }, []);
  return (
    <div className="App" ref={appRef}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/project/:id" element={<ProjectProcess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
