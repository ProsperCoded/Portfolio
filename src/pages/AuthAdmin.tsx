import { Button, Checkbox, Flex, Input } from "antd";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import Page from "./Page";
import { useContext, useEffect, useState } from "react";
import { IS_ADMIN } from "../App";
import { URL_BASE } from "../main";
export async function authAction({ request }: { request: any }) {
  const data = await request.formData();
  // const in
  let intent = data.get("intent");
  let url;
  if (intent === "register") url = new URL("admin/register", URL_BASE);
  else url = new URL("admin/login", URL_BASE);
  url = new URL("admin/login", URL_BASE);
  console.log("making request to ", url.href);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.get("username"),
      password: data.get("password"),
    }),
    // credentials: "include",
  });
  console.log("headers", res.headers.entries());
  let authToken = res.headers.get("x-auth-token") as string;
  console.log("token from server: ", authToken);
  console.log("keys", res.headers.keys());
  localStorage.setItem("jwt-token", authToken);
  const result = await res.json();
  console.log(result);
  if (res.ok) {
    return redirect("/services");
  }
  return { message: result.message };
}
export function AuthAdmin() {
  const data = useActionData() as { message: string } | undefined;
  const [msg, setMsg] = useState("");
  const [intent, setIntent] = useState("login");
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.message) {
      setMsg(data.message);
    }
  }, [data]);
  return (
    <Page className="authAdmin-page" heading="Login as Admin">
      <Form action="/admin/login" method="POST">
        <Flex justify="end">
          <Button
            type="primary"
            onClick={async () => {
              localStorage.removeItem("jwt-token");
              setMsg("Logout Successfully");
              setTimeout(() => {
                return navigate("/");
              }, 500);
            }}
          >
            Logout
          </Button>
        </Flex>
        <p className="short-heading" style={{ color: "tomato" }}>
          {msg}
        </p>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Username</label>
          <Input placeholder="User name" id="username" name="username" />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">Password</label>
          <Input.Password placeholder="Password" name="password" />
        </div>
        <Button type="primary" htmlType="submit" name="intent" value={intent}>
          {intent}
        </Button>

        <div>
          <Checkbox
            onClick={(e: any) => {
              setIntent((e.target.checked as boolean) ? "register" : "login");
            }}
            disabled
          >
            Register as admin(Not allowed)
          </Checkbox>
        </div>
      </Form>
    </Page>
  );
}
