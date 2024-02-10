export type TechnologyInstance = {
  displayCaption?: boolean;
};
export type ProjectDataType = {
  title: string;
  link: string;
  description: string;
  githubRepo: string;
  Technologies: (({ displayCaption }: TechnologyInstance) => JSX.Element)[];
  imageInterface: string;
  icon: string;
  fullProcess?: string;
  challenges?: string;
};
