import { useState } from "react";

export function UploadInput({
  name,
  accept = ".jpg, .jpeg, .png, .webp",
}: {
  name: string;
  accept: string;
}) {
  const [image, setImage] = useState<undefined | string>("");
  return (
    <div className="upload-image-container">
      <input
        name={name}
        type="file"
        title="upload-skill"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
        id="actual-btn"
        accept={accept}
        hidden
      ></input>
      <label htmlFor="actual-btn">
        <span> {image ? image.match(/[^\\]+$/)![0] : "Choose File"}</span>
        <i className="bi bi-upload"></i>
      </label>
    </div>
  );
}
