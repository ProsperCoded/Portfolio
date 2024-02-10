import reactLogo from "./assets/icons/react.webp";
import javascriptLogo from "./assets/icons/javascript.webp";
import sassLogo from "./assets/icons/sass.webp";
import typeScriptLogo from "./assets/icons/typescript.webp";
import viteLogo from "./assets/icons/vite.webp";
import vueLogo from "./assets/icons/vue.webp";

// import typescriptLogo from "./assets/icons/typescript.webp";
import npmLogo from "./assets/icons/npm.webp";
import mongodbLogo from "./assets/icons/mongodb.webp";
import expressLogo from "./assets/icons/express.webp";
import nodeLogo from "./assets/icons/node.webp";
import antjsLogo from "./assets/icons/antjs.webp";
import gitLogo from "./assets/icons/git.webp";
import gitHubLogo from "./assets/icons/gitHub.webp";
import tailwindcssLogo from "./assets/icons/tailwind.webp";
import lodashLogo from "./assets/icons/lodash.webp";
import htmlLogo from "./assets/icons/html.webp";
import xdLogo from "./assets/icons/xd.webp";
import graphql from "./assets/icons/graphql.webp";
import cssLogo from "./assets/icons/css.webp";

import { TechnologyInstance } from "../../types";
export function Technology({
  url,
  name,
  displayCaption,
}: {
  url: string;
  name: string;
  displayCaption: boolean;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={url} alt={name} className="technology" title={name} />
      {displayCaption && (
        <p className="caption" style={{ padding: 0, margin: 0 }}>
          {name}
        </p>
      )}
    </div>
  );
}

export function React({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={reactLogo} displayCaption={displayCaption} name="React" />
  );
}
export function Javascript({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={javascriptLogo}
      name="React"
      displayCaption={displayCaption}
    />
  );
}
export function Sass({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={sassLogo} name="React" displayCaption={displayCaption} />
  );
}

export function TypeScript({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={typeScriptLogo}
      name="React"
      displayCaption={displayCaption}
    />
  );
}

export function Vite({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={viteLogo} name="React" displayCaption={displayCaption} />
  );
}
export function Vue({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={vueLogo} name="Vue" displayCaption={displayCaption} />
  );
}

export function NPM({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={npmLogo} name="NPM" displayCaption={displayCaption} />
  );
}

export function MongoDB({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={mongodbLogo}
      name="MongoDB"
      displayCaption={displayCaption}
    />
  );
}

export function Express({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={expressLogo}
      name="Express"
      displayCaption={displayCaption}
    />
  );
}

export function Node({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={nodeLogo} name="Node" displayCaption={displayCaption} />
  );
}

export function AntJS({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={antjsLogo} name="AntJS" displayCaption={displayCaption} />
  );
}

export function Git({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={gitLogo} name="Git" displayCaption={displayCaption} />
  );
}

export function GitHub({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={gitHubLogo}
      name="GitHub"
      displayCaption={displayCaption}
    />
  );
}

export function TailwindCSS({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={tailwindcssLogo}
      name="TailwindCSS"
      displayCaption={displayCaption}
    />
  );
}

export function Lodash({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology
      url={lodashLogo}
      name="Lodash"
      displayCaption={displayCaption}
    />
  );
}

export function HTML({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={htmlLogo} name="HTML" displayCaption={displayCaption} />
  );
}

export function XD({ displayCaption = false }: TechnologyInstance) {
  return <Technology url={xdLogo} name="XD" displayCaption={displayCaption} />;
}

export function GraphQL({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={graphql} name="GraphQL" displayCaption={displayCaption} />
  );
}

export function CSS({ displayCaption = false }: TechnologyInstance) {
  return (
    <Technology url={cssLogo} name="CSS" displayCaption={displayCaption} />
  );
}
