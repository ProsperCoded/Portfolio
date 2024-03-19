import {
  Input,
  Button,
  Slider,
  Select,
  Space,
  Flex,
  Popconfirm,
  Card,
} from "antd";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Form as FormRouter,
  Link,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { TechnologyType } from "../types";

import Page from "./Page";
import {
  IS_ADMIN,
  NOTIFICATION_CONTEXT,
  PROJECTS_CONTEXT,
  SKILLS_CONTEXT,
  TECHNOLOGIES_CONTEXT,
} from "../App";
import { UploadInput } from "../_globalComponents";
import { GetTechComponent } from "../components/Projects/Technologies";
import { deleteProject, deleteSkill, deleteTechnology } from "../apis";
import TextArea from "antd/es/input/TextArea";
import * as _ from "lodash";
import { URL_BASE } from "../main";

enum ServiceOperations {
  UPLOAD_SKILLS = "upload skills",
  UPDATE_SKILLS = "update skills",
  UPLOAD_TECHNOLOGIES = "upload technologies",
  UPLOAD_PROJECT = "upload project",
  UPDATE_PROJECT = "update project",
}
export const servicesAction = async ({ request }: any) => {
  // const [TechnologiesData] = useContext(TECHNOLOGIES_CONTEXT);
  const data = (await request.formData()) as FormData;
  console.log("image include %s <-", data.getAll("image"));
  let intent = data.get("intent") as string;
  data.delete("intent");

  let message = "Failure To Upload";
  let type = undefined;

  if (intent === ServiceOperations.UPLOAD_TECHNOLOGIES) {
    const currentTechsNames = data.get("existing-data") as string;
    data.delete("existing-data");
    // console.log("technologies", JSON.parse(currentTechsNames));
    const uploadTechNames = data.getAll("name") as string[];
    const techExist = uploadTechNames.find((tech) => {
      return currentTechsNames.includes(tech);
    });
    if (techExist)
      return { error: `The Technology : ${techExist} already exist` };

    const result = await fetch(new URL("/technologies/create", URL_BASE), {
      method: "POST",
      body: data,
    });
    if (result.ok) {
      let json = await result.json();
      console.log(json);
      message = "Uploaded Technologies Successfully (Reload to see results)";
      type = ServiceOperations.UPLOAD_TECHNOLOGIES;
    } else {
      message = "Error Occured in Uploading Technologies";
    }
  } else if (intent === ServiceOperations.UPLOAD_SKILLS) {
    const currentSkillTechIds = data.get("existing-data") as string;
    data.delete("existing-data");
    const uploadTechIds = data.getAll("technologyId") as string[];
    const skillExist = uploadTechIds.find((skill) => {
      return currentSkillTechIds.includes(skill);
    });
    if (skillExist) return { error: `The Skill : already exist` };
    const result = await fetch(new URL("/skills/create", URL_BASE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mastery: data.getAll("mastery"),
        technologyId: data.getAll("technologyId"),
        category: data.getAll("category"),
      }),
    });
    if (result.ok) {
      message = "Uploaded Skills Successfully (Reload to see results)";
      type = ServiceOperations.UPLOAD_SKILLS;
    } else {
      message = "Error Occurred in Uploading Skills";
    }
  } else if (intent === ServiceOperations.UPDATE_SKILLS) {
    const skillId = data.get("skillId");
    // data.delete('skillId');
    const result = await fetch(new URL(`/skills/${skillId}`, URL_BASE), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mastery: data.get("mastery"),
        technologyId: data.get("technologyId"),
        category: data.get("category"),
      }),
    });
    if (result.ok) {
      message = "Update Skills Successfully (Reload to see results)";
      type = ServiceOperations.UPDATE_PROJECT;
    } else {
      message = "Error Occurred in Updating Skills";
    }
  } else if (intent === ServiceOperations.UPLOAD_PROJECT) {
    const result = await fetch(new URL("/projects/create", URL_BASE), {
      method: "POST",
      body: data,
    });
    if (result.ok) {
      let json = await result.json();
      console.log(json);
      message = "Uploaded Projects Successfully (Reload to see results)";
      type = ServiceOperations.UPLOAD_PROJECT;
    } else {
      message = "Error Occured in Uploading Project";
    }
  } else if (intent === ServiceOperations.UPDATE_PROJECT) {
    const projectId = data.get("projectId") as string;
    data.delete("projectId");
    const result = await fetch(new URL(`/projects/${projectId}`, URL_BASE), {
      method: "PUT",
      body: data,
    });
    if (result.ok) {
      let json = await result.json();
      console.log(json);
      message = "Project Successfully Updated (Reload to see results)";
      type = ServiceOperations.UPDATE_PROJECT;
    } else {
      message = "Error Occurred in Updating Project";
    }
  }
  return { message, type };
};

function Services() {
  const [isAdmin, setIsAdmin] = useContext(IS_ADMIN);
  const data = useActionData() as any;
  const [TechnologiesData, setTechnologiesData] =
    useContext(TECHNOLOGIES_CONTEXT);
  const navigate = useNavigate();
  const openNotification = useContext(NOTIFICATION_CONTEXT);
  const [skillsData, setSkillsData] = useContext(SKILLS_CONTEXT);

  const [Technologies, setTechnologies] = useState([""]);
  const [skills, setSkills] = useState<
    { techId: string; mastery: number; category: string }[]
  >([{ techId: "", mastery: 50, category: "related" }]);

  const [skillIntent, setSkillIntent] = useState<ServiceOperations>(
    ServiceOperations.UPLOAD_SKILLS
  );
  const [skillId, setSkillId] = useState("");
  const [project, setProject] = useState<{
    title: string;
    description: string;
    gitHubRepo: string;
    devProcess: string;
    link: string;
    technologiesId: string[];
  }>({
    title: "",
    link: "",
    description: "",
    gitHubRepo: "",
    devProcess: "",
    technologiesId: [],
  });
  useLayoutEffect(() => {
    const authorize = async () => {
      const url = new URL("/admin/auto-login", URL_BASE);
      const token = localStorage.getItem("jwt-token");
      console.log("token is :", token);
      if (token && token !== "null") {
        const res = await fetch(url, {
          headers: {
            "x-auth-token": token,
          },
          method: "POST",
          // credentials: "include",
        });
        if (res.ok) {
          // return null;
          setIsAdmin(true);
          return null;
        }
      }
      // redirect("/admin/login");
      console.log("redirected");
      setIsAdmin(false);

      setTimeout(() => {
        return navigate("/admin/login");
      }, 1000);
    };
    !isAdmin && authorize();
  }, []);
  useEffect(() => {
    console.log("global DATA", data);
    if (data && data.type === ServiceOperations.UPLOAD_TECHNOLOGIES) {
      setTechnologies([""]);
    } else if (data && data.type === ServiceOperations.UPLOAD_SKILLS) {
      setSkills([{ techId: "", mastery: 50, category: "related" }]);
    } else if (data && data.type === ServiceOperations.UPLOAD_PROJECT) {
      setProject({
        title: "",
        link: "",
        description: "",
        gitHubRepo: "",
        devProcess: "",
        technologiesId: [],
      });
    }
  }, [data]);

  if (!isAdmin) {
    return (
      <Page heading="Not Authorized">
        <>
          <h1
            style={{
              color: "red",
              padding: "1rem 2rem",
              backgroundColor: "rebeccapurple",
            }}
          >
            You are not authorized to access this page. Please contact the admin
            to access this page.
          </h1>
          <Link to="/admin/login">Login Here</Link>
        </>
      </Page>
    );
  }
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
        {data &&
          ((data.message && (
            <p className="upload__message sub-heading">
              <i className="bi bi-check2-circle"></i>
              {data.message}
            </p>
          )) ||
            (data.error && (
              <p className="upload__message sub-heading">
                <i className="bi bi-x-square"></i>
                {data.error}
              </p>
            )))}
        <FormRouter
          method="post"
          action="/services"
          // action="http://localhost:3000"
          className="upload"
          encType="multipart/form-data"
        >
          <p className="sub-heading"> Upload Technologies</p>
          <div className="upload__technologies">
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
          <input
            type="text"
            value={JSON.stringify(TechnologiesData.map((tech) => tech.name))}
            // value="hello"
            hidden
            name="existing-data"
            readOnly
          />
          <input
            type="submit"
            className="btn btn--twist"
            value={ServiceOperations.UPLOAD_TECHNOLOGIES}
            name="intent"
          />
          <ul className="upload__tech-list">
            {TechnologiesData.map((tech, index) => {
              return (
                <li key={index}>
                  <span className="delete">
                    <Popconfirm
                      title="Delete the Technology"
                      description="Are you sure to delete this technology, 
                       Every other project or skill linked to this will be ?"
                      okText="Delete"
                      onConfirm={() => {
                        let previous = [...TechnologiesData];
                        setTechnologiesData(
                          TechnologiesData.filter((t, i) => i !== index)
                        );
                        try {
                          deleteTechnology(tech.id);
                        } catch (error) {
                          console.log(error);
                          setTechnologiesData(previous);
                        }
                      }}
                      cancelText="Cancel"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </Popconfirm>
                  </span>
                  {GetTechComponent(tech, true)}
                </li>
              );
            })}
          </ul>
        </FormRouter>
        <FormRouter
          method="post"
          action="/services"
          // action="http://localhost:3000"
          className="upload"
          // encType="application/x-www-form-urlencoded"
        >
          <p className="sub-heading"> Upload Skills</p>
          <div className="upload__skills">
            {skills.map((skill, index) => {
              return (
                <SkillField
                  TechnologiesData={TechnologiesData}
                  index={index}
                  setSkills={setSkills}
                  key={index}
                  skill={skill}
                  added={
                    index !== skills.length - 1 &&
                    skillIntent === ServiceOperations.UPLOAD_SKILLS
                  }
                />
              );
            })}
          </div>

          <input
            type="submit"
            className="btn btn--twist"
            value={skillIntent}
            readOnly
            name="intent"
          />
          {skillIntent === ServiceOperations.UPDATE_SKILLS && (
            <input name="skillId" value={skillId} hidden readOnly />
          )}
          <ul className="upload__skill-list">
            {skillsData.map((skill, index) => {
              return (
                <li key={index}>
                  <span className="delete">
                    <i
                      onClick={() => {
                        let previous = [...skillsData];
                        setSkillsData(skillsData.filter((s, i) => i !== index));
                        try {
                          deleteSkill(skill.id);
                        } catch (error) {
                          console.log(error);
                          setSkillsData(previous);
                        }
                      }}
                      className="bi bi-trash3-fill"
                    ></i>

                    <i
                      className="bi bi-pencil-square clickable"
                      onClick={() => {
                        if (skills.length <= 1) {
                          setSkillIntent(ServiceOperations.UPDATE_SKILLS);
                          setSkillId(skill.id);
                          setSkills(() => {
                            return [
                              {
                                techId: skill.technology.id,
                                mastery: skill.mastery,
                                category: skill.category,
                              },
                            ];
                          });
                        } else {
                          openNotification(
                            "Invalid Service Operation",
                            "You must upload current skills, or delete extra skills you don't need before upload"
                          );
                        }
                      }}
                    ></i>
                  </span>
                  {GetTechComponent(skill.technology, true)}
                  <span className="mastery">{skill.mastery} %</span>
                </li>
              );
            })}
          </ul>
          <input
            type="text"
            value={JSON.stringify(
              skillsData.map((skill) => skill.technology.id)
            )}
            // value="hello"
            readOnly
            hidden
            name="existing-data"
          />
        </FormRouter>
        <FormRouter
          method="post"
          action="/services"
          // action="http://localhost:3000"
          className="upload"
          encType="multipart/form-data"
          // encType="application/x-www-form-urlencoded"
        >
          <p className="sub-heading"> Upload Project</p>
          <ProjectField
            project={project}
            setProject={setProject}
            TechnologiesData={TechnologiesData}
          />
        </FormRouter>
      </>
    </Page>
  );
}
function ProjectField({
  project,
  setProject,
  TechnologiesData,
}: {
  project: {
    title: string;
    description: string;
    gitHubRepo: string;
    devProcess: string;
    link: string;
    technologiesId: string[];
  };
  setProject: Function;
  TechnologiesData: TechnologyType[];
}) {
  const [projectsData, setProjectsData] = useContext(PROJECTS_CONTEXT);
  const [intent, setIntent] = useState(ServiceOperations.UPLOAD_PROJECT);
  const [projectId, setProjectId] = useState<string | undefined>();
  return (
    <>
      <div className="upload__project">
        <Flex gap="2rem">
          {intent === ServiceOperations.UPDATE_PROJECT && (
            <input
              type="text"
              name="projectId"
              value={projectId}
              hidden
              readOnly
            />
          )}
          <Input
            value={project.title}
            addonBefore="Title: "
            name="title"
            className="upload__project-title"
            required
            onChange={(e) => [
              setProject((prev: any) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              }),
            ]}
          />
          <Input
            value={project.link}
            name="link"
            addonBefore="http:// "
            className="upload__project-title"
            placeholder="http://example.com"
            required
            onChange={(e) => [
              setProject((prev: any) => {
                return {
                  ...prev,
                  link: e.target.value,
                };
              }),
            ]}
          />
        </Flex>
        <Space.Compact style={{ width: "100%" }}>
          <Button>
            <i className="bi bi-github"></i>
          </Button>
          <Input
            value={project.gitHubRepo}
            name="gitHubRepo"
            width={"100%"}
            addonAfter=".git"
            className="upload__project-title"
            placeholder="http://github.com/prospercoded/project.git"
            required
            onChange={(e) => [
              setProject((prev: any) => {
                return {
                  ...prev,
                  gitHubRepo: e.target.value,
                };
              }),
            ]}
          />
        </Space.Compact>
        <p className="short-heading">Short Description</p>
        <TextArea
          value={project.description}
          name="description"
          onChange={(e) => [
            setProject((prev: any) => {
              return {
                ...prev,
                description: e.target.value,
              };
            }),
          ]}
          placeholder="Project description ..."
          autoSize={{ minRows: 2, maxRows: 4 }}
          required
        />
        <p className="short-heading">
          {" "}
          Development Process (Markdown / Plaintext is allowed)
        </p>
        <TextArea
          value={project.devProcess}
          name="devProcess"
          onChange={(e) => [
            setProject((prev: any) => {
              return {
                ...prev,
                devProcess: e.target.value,
              };
            }),
          ]}
          placeholder="Write on Challenges, And Solutions you found in this project, including findings during creation ..."
          autoSize={{ minRows: 10, maxRows: 20 }}
          required
        />
      </div>
      <Flex justify="start">
        <UploadInput name="icon" />
        <UploadInput name="interface" />
      </Flex>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          mode="multiple"
          size="large"
          placeholder="Please Select Technology Used"
          // defaultValue={"html"}
          onChange={(value, option: { id: string }[] | { id: string }) => {
            console.log(option);

            if (_.isArray(option)) {
              setProject((prev: any) => {
                return {
                  ...prev,
                  technologiesId: (option as Array<{ id: string }>).map(
                    (e) => e.id
                  ),
                };
              });
            } else {
              setProject((prev: any) => {
                return {
                  ...prev,
                  technologiesId: [option],
                };
              });
            }
          }}
          value={project.technologiesId.map(
            (techId) => TechnologiesData.find((d) => d.id === techId)!.name
          )}
          style={{ width: "100%" }}
          options={TechnologiesData.map((t: { id: any; name: any }) => {
            return {
              value: t.name,
              label: t.name,
              id: t.id,
            };
          })}
        />
      </Space>
      {project.technologiesId.map((id, index) => {
        return (
          <input
            type="hidden"
            value={id}
            name="technologiesId"
            hidden
            key={index}
            readOnly
          />
        );
      })}
      <input
        type="submit"
        className="btn btn--twist"
        value={intent}
        name="intent"
        readOnly
      />
      {
        <ul className="upload__projects-list">
          {projectsData.map((p, index) => {
            return (
              <li>
                <Card
                  type="inner"
                  title={p.title}
                  key={index}
                  extra={
                    <>
                      <i
                        className="bi bi-pencil-square clickable"
                        onClick={() => {
                          setIntent(ServiceOperations.UPDATE_PROJECT);
                          setProjectId(p.id);
                          setProject(() => {
                            return {
                              // ...prev,
                              title: p.title,
                              description: p.description,
                              gitHubRepo: p.gitHubRepo,
                              devProcess: p.devProcess,
                              link: p.link,
                              technologiesId: p.technologies.map(
                                (tech) => tech.id
                              ),
                            };
                          });
                        }}
                      ></i>
                      <Popconfirm
                        title="Delete the project"
                        description="Are you sure to delete this project?"
                        okText="Yes"
                        onConfirm={() => {
                          let previous = [...TechnologiesData];
                          setProjectsData((prev: any[]) => {
                            return prev.filter((t, i) => i !== index);
                          });
                          try {
                            deleteProject(p.id);
                          } catch (error) {
                            console.log(error);
                            setProjectsData(previous);
                          }
                        }}
                        cancelText="No"
                        className="delete"
                      >
                        <i className="bi bi-trash3-fill clickable"></i>
                      </Popconfirm>
                    </>
                  }
                >
                  {p.description}
                </Card>
              </li>
            );
          })}
        </ul>
      }
    </>
  );
}
function SkillField({
  TechnologiesData,
  skill,
  setSkills,
  index,
  added,
}: {
  TechnologiesData: TechnologyType[];
  setSkills: React.Dispatch<
    React.SetStateAction<
      {
        techId: string;
        mastery: number;
        category: string;
      }[]
    >
  >;
  skill: { techId: string; mastery: number; category: string };
  index: number;
  added: boolean;
}) {
  // const [mastery, setMastery] = useState(30);
  const [techId, setTechId] = useState("");
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="upload__skill">
      <Slider
        max={100}
        min={0}
        value={skill.mastery}
        onChange={(e) => {
          setSkills((prevState) => {
            let copy = [...prevState];
            copy[index].mastery = e;
            return copy;
          });
        }}
        className="upload__skill-slider"
      />
      <input
        name="mastery"
        value={skill.mastery}
        hidden
        type="number"
        readOnly
      />
      <input name="technologyId" value={skill.techId} hidden readOnly />
      <input name="category" value={skill.category} hidden readOnly />
      <Select
        showSearch={true}
        placeholder="Select a Technology You Just Learnt"
        optionFilterProp="children"
        onChange={(value) => {
          setSkills((prevState) => {
            let copy = [...prevState];
            copy[index].techId = value;
            return copy;
          });
        }}
        // onSearch={onSearch}
        filterOption={filterOption}
        value={TechnologiesData.find((e) => e.id === skill.techId)?.name}
        options={TechnologiesData.map((n) => {
          return {
            label: n.name,
            value: n.id,
          };
        })}
      />
      <Select
        // showSearch={true}
        placeholder="Select Category"
        optionFilterProp="children"
        onChange={(value) => {
          setSkills((prevState) => {
            let copy = [...prevState];
            copy[index].category = value;
            return copy;
          });
        }}
        // onSearch={onSearch}
        value={_.capitalize(skill.category)}
        filterOption={filterOption}
        options={[
          {
            label: "Related",
            value: "related",
          },
          {
            label: "Frontend",
            value: "frontend",
          },
          {
            label: "Backend",
            value: "backend",
          },
        ]}
      />
      <div>
        {!added && (
          <Button
            ghost
            type="dashed"
            className="add-skill"
            shape="round"
            onClick={() => {
              // dispatcher({ type: ServiceTypes.addSkills });
              setSkills((prev) => {
                return [
                  ...prev,
                  { techId: "", mastery: 30, category: "related" },
                ];
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
          className="add"
          onClick={() => {
            setSkills((prev: any) => {
              const copy = [...prev];
              copy.splice(index, 1);
              return copy;
            });
          }}
        >
          <i className="bi bi-trash3"></i> Delete
        </Button>
      </div>
    </div>
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
            className="add"
            shape="round"
            onClick={() => {
              // dispatcher({ type: ServiceTypes.addSkills });
              setTech((prev) => {
                return [...prev, ""];
              });
            }}
          >
            <i className="bi bi-plus-lg"></i> Add
          </Button>
        )}
        <Button
          ghost
          type="dashed"
          shape="round"
          className="delete"
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
