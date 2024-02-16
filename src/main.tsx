import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Services, { servicesAction } from "./pages/Services.tsx";
import AboutPage from "./pages/About.tsx";
import ProjectProcess from "./pages/ProjectProcess.tsx";
function Temp() {
  return <div>Temp</div>;
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/services"
        element={<Services />}
        action={servicesAction}
      ></Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/project/:id" element={<ProjectProcess />} />
    </Route>
  )
);
function Main() {
  return <RouterProvider router={router} />;
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
