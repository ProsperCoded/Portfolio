import { Upload, Input, Form, Button } from "antd";
import Page from "./Page";
import { useEffect, useReducer, useState } from "react";
import { Form as FormRouter, redirect, useActionData } from "react-router-dom";
import { UploadInput } from "../_globalComponents";
// import { Input, FormControl, FormHelperText } from "@mui/joy";

export const URL_TECH_CREATE = "http://localhost:3000/technologies/create";
export const URL_TECH_GET = "http://localhost:3000/technologies";
export const servicesAction = async ({ request }: any) => {
  const data = (await request.formData()) as FormData;

  fetch(URL_TECH_CREATE, {
    method: "POST",
    body: data,
  })
    .then((res) => {
      console.log("Headers Include", res.headers);
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
  return redirect("/");
};
function Services() {
  const data = useActionData();
  const [Technologies, setTechnologies] = useState([""]);
  useEffect(() => {
    console.log("global DATA", data);
  }, []);
  return (
    <Page
      heading="Services"
      className="services"
      subHeading={
        <span>
          Personal API Client To Perform Crud Operations on data in Portfolio
        </span>
      }
    >
      <>
        <FormRouter
          method="post"
          action="/services"
          // action="http://localhost:3000"
          className="upload"
          encType="multipart/form-data"
          // enctype="multipart/form-data"
        >
          <div className="upload__technologies">
            <label htmlFor="technology"> Technologies</label>
            <label htmlFor="technology-uploads"> Upload Technology Image</label>
            {Technologies.map((technology: string, index: number) => {
              return (
                <TechField
                  technologyName={technology}
                  index={index}
                  setTech={setTechnologies}
                  key={index}
                  added={index !== Technologies.length - 1}
                />
              );
            })}
          </div>
          <input type="submit" className="btn btn--twist" value="Submit" />
        </FormRouter>
        <FormRouter
          method="post"
          action="/services"
          // action="http://localhost:3000"
          className="upload"
          encType="multipart/form-data"
        >
          <div className="upload__projects">
            <label htmlFor="project"> Technologies</label>
            <label htmlFor="technology-uploads"> Upload Technology Image</label>
            {Technologies.map((technology: string, index: number) => {
              return (
                <TechField
                  technologyName={technology}
                  index={index}
                  setTech={setTechnologies}
                  key={index}
                  added={index !== Technologies.length - 1}
                />
              );
            })}
          </div>
          <input type="submit" className="btn btn--twist" value="Submit" />
        </FormRouter>
      </>
    </Page>
  );
}

function TechField({
  technologyName,
  index,
  // dispatcher,
  setTech,
  added,
}: {
  technologyName: string;
  index: number;

  added: boolean;
  setTech: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // const [added, setAdded] = useState(false);

  return (
    <>
      <div>
        <Input
          type="text"
          id="technology"
          // name={"technology-" + index.toString()}
          name="name"
          placeholder="Technology name..."
          value={technologyName}
          onChange={(e) => {
            setTech((prev) => {
              const copy = [...prev];
              copy[index] = e.target.value;
              return copy;
            });
          }}
        />

        {!added && (
          <Button
            ghost
            type="dashed"
            className="add-technology"
            shape="round"
            onClick={() => {
              // dispatcher({ type: ServiceTypes.addSkills });
              setTech((prev) => {
                return [...prev, ""];
              });
              // setAdded((prev) => !prev);
            }}
          >
            <i className="bi bi-plus-lg"></i> Add
          </Button>
        )}
        <Button
          ghost
          type="dashed"
          shape="round"
          className="add-technology"
          onClick={() => {
            setTech((prev) => {
              const copy = [...prev];
              copy.splice(index, 1);
              return copy;
            });
          }}
        >
          <i className="bi bi-trash3"></i> Delete
        </Button>
      </div>
      <UploadInput name="image" accept=".webp" />
    </>
  );
}

export default Services;
