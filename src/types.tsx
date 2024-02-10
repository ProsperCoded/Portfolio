export type ProjectDataType = {
  title: string;
  link: string;
  description: string;
  githubRepo: string;
  Technologies: (() => JSX.Element)[];
  imageInterface: string;
  icon: string;
  fullProcess?: string;
  challenges?: string;
};
