export type TechnologyInstance = {
  displayCaption?: boolean;
};
export type ProjectDataType = {
  id: string;
  title: string;
  link: string;
  description: string;
  gitHubRepo: string;
  technologies: TechnologyType[];
  interface: string;
  icon: string;
  devProcess: string;
  // challenges?: string;
};

export type TechnologyType = {
  id: string;
  name: string;
  image: string;
};
export type SkillsDataType = {
  id: string;
  mastery: number;
  category: "frontend" | "backend" | "related";
  technology: TechnologyType;
};
