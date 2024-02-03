import reactLogo from "./assets/icons/react.webp";
export function Technology({ url, name }: { url: string; name: string }) {
  return <img src={url} alt={name} className="technology" />;
}
export function React() {
  return <Technology url={reactLogo} name="React" />;
}
