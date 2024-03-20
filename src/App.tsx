import "./styles/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AboutPage from "./pages/About.tsx";
import Nav from "./components/Nav/Nav.tsx";
import ProjectProcess from "./pages/ProjectProcess/ProjectProcess.tsx";
import { createContext, useContext, useEffect, useRef, useState } from "react";
// import Services, { servicesAction } from "./pages/Services.tsx";
import { ProjectDataType, SkillsDataType, TechnologyType } from "./types.tsx";
import { getProjects, getSkills, getTechnologies } from "./apis.tsx";
import { ConfigProvider, Segmented } from "antd";
import useNotificationWindow from "./_globalComponents.tsx";

export const TECHNOLOGIES_CONTEXT = createContext<[TechnologyType[], Function]>(
  [[], () => {}]
);
export const SKILLS_CONTEXT = createContext<[SkillsDataType[], Function]>([
  [],
  () => {},
]);
export const PROJECTS_CONTEXT = createContext<[ProjectDataType[], Function]>([
  [],
  () => {},
]);
export let isDesktop = window.innerWidth >= 768;
export let IS_ADMIN = createContext<[boolean, Function]>([false, () => {}]);
export let NOTIFICATION_CONTEXT = createContext<
  (title: string, desc: string, duration?: number) => void
>(() => {});
function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const currentScrollHeight = useRef(window.screenY);
  const [TechnologiesData, setTechnologiesData] = useState<TechnologyType[]>(
    []
  );
  const [skillsData, setSkillsData] = useState<SkillsDataType[]>([]);
  const [projectsData, setProjectsData] = useState<ProjectDataType[]>([]);
  const { notificationHolder, openNotification } = useNotificationWindow();
  function navAutoVisibility() {
    document.addEventListener("scroll", () => {
      let newScrollHeight = window.scrollY;
      if (newScrollHeight > currentScrollHeight.current) {
        appRef.current?.classList.add("nav-hide");
      } else {
        appRef.current?.classList.remove("nav-hide");
      }
      currentScrollHeight.current = newScrollHeight;
    });
  }

  async function fetchAppData() {
    try {
      const techs = await getTechnologies();
      console.log("techs", techs);
      setTechnologiesData(techs);

      const skills = await getSkills();

      console.log("skills", skills);
      setSkillsData(skills);
      const projects = await getProjects();

      console.log("projects", projects);
      setProjectsData(projects);
    } catch (error) {
      let err = error as { type: string; message: string };
      openNotification(`Sorry a ${err.type} has occurred`, err.message);
    }
  }
  useEffect(() => {
    navAutoVisibility();
    fetchAppData();
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: "#080030",
            itemSelectedBg: "#bb2284",
            itemColor: "rgba(255, 255, 255, 0.82)",
          },
          Select: {
            optionActiveBg: "var(--color-blue-light-transparent)",
            colorBgContainer: "var(--color-blue-light-transparent)",
            optionSelectedBg: "#080030",
            colorBgElevated: "rgb(0, 51, 123)",
            optionSelectedColor: "var(--color-light)",
          },
          Input: {
            // activeBg: "transparent",
            // colorFill: "transparent",
            // hoverBg: "transparent",
            // colorFillContent: "transparent",
          },
          Button: {
            colorBgContainer: "var(--color-primary)",
            colorFill: "var(--color-secondary)",
            // colorBgElevated: "var(--color-secondary)",
          },
          Notification: {
            colorText: "var(--color-dark)",
            colorTextHeading: "var(--color-dark)",
            colorBgContainer: "var(--color-blue-light)",
          },
        },
        token: {
          // Seed Token
          colorPrimary: "var(--color-secondary)",
          colorFillSecondary: "var(--color-blue-light)",
          colorFillTertiary: "var(--color-secondary)",
          borderRadius: 6,
          colorText: "var(--color-light)",
          colorBgContainer: "var(--color-blue-light-transparent)",
          colorFill: "var(--color-secondary)",

          // Alias Token
        },
      }}
    >
      <IS_ADMIN.Provider value={[isAdmin, setIsAdmin]}>
        <NOTIFICATION_CONTEXT.Provider value={openNotification}>
          <PROJECTS_CONTEXT.Provider value={[projectsData, setProjectsData]}>
            <SKILLS_CONTEXT.Provider value={[skillsData, setSkillsData]}>
              <TECHNOLOGIES_CONTEXT.Provider
                value={[TechnologiesData, setTechnologiesData]}
              >
                <div className="App" ref={appRef}>
                  {notificationHolder}
                  <Nav />
                  <Outlet />
                </div>
              </TECHNOLOGIES_CONTEXT.Provider>
            </SKILLS_CONTEXT.Provider>
          </PROJECTS_CONTEXT.Provider>
        </NOTIFICATION_CONTEXT.Provider>
      </IS_ADMIN.Provider>
    </ConfigProvider>
  );
}
export default App;
