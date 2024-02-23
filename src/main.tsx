import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { URL_BASE, servicesAction } from "./pages/Services.tsx";
import AboutPage from "./pages/About.tsx";
import ProjectProcess from "./pages/ProjectProcess.tsx";
import DirectMessage from "./pages/DirectMessage.tsx";
import { AuthAdmin, authAction } from "./pages/AuthAdmin.tsx";
import { Suspense, useContext } from "react";
import React from "react";
// import Services from "./pages/Services.tsx";
const Services = React.lazy(() => import("./pages/Services.tsx"));
function Temp() {
  return <div>Temp</div>;
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/services"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Services />
          </Suspense>
        }
        action={servicesAction}
        // loader={async () => {
        //   // return redirect("/admin/login");
        //   const url = new URL("/admin/auto-login", URL_BASE);
        //   const token = localStorage.getItem("jwt-token");
        //   console.log("token is :", token);
        //   if (token && token !== null) {
        //     const res = await fetch(url, {
        //       headers: {
        //         "x-auth-token": token,
        //       },
        //       method: "POST",
        //       // credentials: "include",
        //     });
        //     if (res.ok) {
        //       return null;
        //     }
        //   }
        //   // redirect("/admin/login");
        //   console.log("redirected");
        //   return redirect("/admin/login");
        // }}
      ></Route>
      <Route path="/admin/login" element={<AuthAdmin />} action={authAction} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dm" element={<DirectMessage />} />
      <Route path="/project/:id" element={<ProjectProcess />} />
    </Route>
  )
);
function Main() {
  return <RouterProvider router={router} />;
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
