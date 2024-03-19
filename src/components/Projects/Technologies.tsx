import { TechnologyInstance, TechnologyType } from "../../types";
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
      <img
        src={url}
        alt={name}
        className="technology"
        title={name}
        loading="lazy"
      />
      {displayCaption && (
        <p className="caption" style={{ padding: 0, margin: 0 }}>
          {name}
        </p>
      )}
    </div>
  );
}
export function GetTechComponentFromList(
  id: String,
  Technologies: TechnologyType[],
  displayCaption = false
) {
  const tech = Technologies.find((tech) => {
    return tech.id === id;
  });
  return (
    <Technology
      name={tech!.name}
      url={tech!.image}
      displayCaption={displayCaption}
    />
  );
}
export function GetTechComponent(tech: TechnologyType, displayCaption = false) {
  return (
    <Technology
      name={tech!.name}
      url={tech!.image}
      displayCaption={displayCaption}
    />
  );
}
