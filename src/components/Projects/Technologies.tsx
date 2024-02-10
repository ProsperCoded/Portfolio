import reactLogo from "./assets/icons/react.webp";
import javascriptLogo from "./assets/icons/javascript.webp";
import sassLogo from "./assets/icons/sass.webp";
import typeScriptLogo from "./assets/icons/typescript.webp";
import viteLogo from "./assets/icons/vite.webp";
import vueLogo from "./assets/icons/vue.webp";
export function Technology({ url, name }: { url: string; name: string }) {
  return <img src={url} alt={name} className="technology" title={name} />;
}
export function React() {
  return <Technology url={reactLogo} name="React" />;
}
export function Javascript() {
  return <Technology url={javascriptLogo} name="React" />;
}
export function Sass() {
  return <Technology url={sassLogo} name="React" />;
}

export function TypeScript() {
  return <Technology url={typeScriptLogo} name="React" />;
}

export function Vite() {
  return <Technology url={viteLogo} name="React" />;
}
export function Vue() {
  return <Technology url={vueLogo} name="Vue" />;
}
