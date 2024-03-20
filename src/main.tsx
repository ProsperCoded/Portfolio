import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
// import { servicesAction } from "./pages/Services.tsx";
// export const URL_BASE = "http://localhost:3000/";
export const URL_BASE = "https://portfolio-api-coded.vercel.app/";
// export const URL_BASE =
//   "https://portfolio-6lngjfyex-prosper-enwerems-projects.vercel.app";
function Main() {
  return <RouterProvider router={router} />;
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
