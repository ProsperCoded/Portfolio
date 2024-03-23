import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
// import { servicesAction } from "./pages/Services.tsx";
// export const URL_BASE = "http://localhost:3000/";
// console.log("server in production", import.meta.env.PROD);
export const URL_BASE = import.meta.env.PROD
  ? "https://portfolio-api-coded.vercel.app/"
  : "http://localhost:3000/";

function Main() {
  return <RouterProvider router={router} />;
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
