import Page from "./Page";
import { whatsappNumber } from "../components/Nav/Nav";
import { emailAddress } from "../components/Nav/Nav";
import { Input, Segmented } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
// import { defaultValues } from "kute.js";
export default function DirectMessage() {
  const [contactMethod, setContactMethod] = useState<"Tel" | "Email">("Tel");
  return (
    <Page
      heading={"Send Me a Message / Hire Me"}
      className={"dm-page"}
      subHeading={
        <h3 className="short-heading">
          <img src="./../assets/logo.webp" alt="" className="icon" />A Partner
          for Visionary Web Experiences
        </h3>
      }
    >
      <div className="dm">
        <ul className="dm__contact-list">
          <li>
            <i className="bi bi-whatsapp"></i>
            {whatsappNumber}
          </li>
          <li>
            <i className="bi bi-envelope"></i>
            {emailAddress}
          </li>
        </ul>
        <div className="dm__fields">
          <Input
            type="text"
            name="name"
            id="name"
            addonBefore="Name: "
            placeholder="Your name"
            required
          />
          <div>
            <p style={{ fontSize: "0.8em", marginBottom: "0.5rem" }}>
              How Should i Contact you(Optional)
            </p>
            <Segmented
              defaultValue="center"
              style={{ marginBottom: 8 }}
              onChange={(value) =>
                setContactMethod(value!.toString() as "Tel" | "Email")
              }
              // default={"Tel"}
              value={contactMethod}
              options={["Tel", "Email"]}
            />
          </div>
          {contactMethod === "Tel" ? (
            <Input type="tel" name="tel" required addonBefore="Tel: " />
          ) : (
            <Input type="email" name="email" addonBefore="Email: " required />
          )}
          <label htmlFor="message">Message : </label>
          <TextArea
            name="message"
            id="message"
            placeholder="Message"
            required
            autoSize={{ minRows: 4, maxRows: 7 }}
          />
          <button type="submit" className="btn btn--twist">
            Send
          </button>
        </div>
      </div>
    </Page>
  );
}
