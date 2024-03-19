import { URL_BASE } from "./main";
import { TechnologyType, SkillsDataType, ProjectDataType } from "./types";

async function get(url: URL) {
  try {
    let result = await fetch(url);
    return result.json();
  } catch (error) {
    // alert("error occured in fetching from " + url.pathname);
    console.error(error);

    throw {
      type: "Network Error",
      message:
        "Error occurred in fetching from " +
        url.pathname +
        "\n Ensure You are not offline, if so please be patient while we rectify the issues with  server",
    };
  }
}
export async function getTechnologies() {
  const url = new URL("/technologies", URL_BASE);
  const Technologies = (await get(url)) as TechnologyType[];
  return Technologies;
}
export async function getProjects() {
  const url = new URL("/projects", URL_BASE);
  const projects = (await get(url)) as ProjectDataType[];
  return projects;
}

export async function getSkills() {
  const url = new URL("/skills", URL_BASE);
  const skills = (await get(url)) as SkillsDataType[];
  return skills;
}
export async function deleteTechnology(id: string) {
  const url = new URL(`/technologies/${id}`, URL_BASE);
  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
}
export async function deleteSkill(id: string) {
  const url = new URL(`/skills/${id}`, URL_BASE);
  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
}

export async function deleteProject(id: string) {
  const url = new URL(`/projects/${id}`, URL_BASE);
  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
}
