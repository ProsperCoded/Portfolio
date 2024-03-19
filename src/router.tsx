import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AboutPage from "./pages/About.tsx";
import ProjectProcess from "./pages/ProjectProcess.tsx";
import DirectMessage from "./pages/DirectMessage.tsx";
import { AuthAdmin, authAction } from "./pages/AuthAdmin.tsx";
import { Suspense, useContext } from "react";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import React from "react";

// import Services from "./pages/Services.tsx";
const Services = React.lazy(() => import("./pages/Services.tsx"));
const servicesAction = import("./pages/Services.tsx").then(
  (e) => e.servicesAction
);
export const URL_BASE = "http://localhost:3000/";
export const router = createBrowserRouter(
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
        action={servicesAction as any}
      ></Route>
      <Route path="/admin/login" element={<AuthAdmin />} action={authAction} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dm" element={<DirectMessage />} />
      <Route path="/project/:id" element={<ProjectProcess />} />
    </Route>
  )
);
