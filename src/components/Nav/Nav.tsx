import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
// import FacebookLogo from "../../assets/icons/facebook.svg";
import { ReactSVG } from "react-svg";
// Icons
import FacebookIcon from "../../assets/icons/facebook.svg";
import WhatsappIcon from "../../assets/icons/whatsapp.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import NavTogglerIcon from "../../assets/icons/navtoggler.svg";
import GitHub from "../../assets/icons/github.svg";
import { Tooltip } from "antd";
import { useReducer, useRef, useState } from "react";

const currentOrigin = window.location.origin;
function TooltipLinks({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) {
  return (
    <Tooltip
      title={title}
      arrow
      placement="bottom"
      trigger={["hover"]}
      // mouseLeaveDelay={1}
      color="var(--color-secondary)"
      // align={"center"}
      overlayClassName="tooltip-links"
    >
      {children}
    </Tooltip>
  );
}
enum LinkCopiedActions {
  whatsapp = "w",
  email = "e",
}
function LinkCopiedReducer(
  state: Object,
  action: { type: LinkCopiedActions; value: Boolean }
) {
  switch (action.type) {
    case LinkCopiedActions.whatsapp:
      return {
        ...state,
        whatsappCopied: action.value,
      };
    case LinkCopiedActions.email:
      return {
        ...state,
        emailCopied: action.value,
      };
  }
  return {
    whatsappCopied: false,
    emailCopied: false,
  };
}
function Nav() {
  const [openLinks, setOpenLinks] = useState<Boolean>(false);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const whatsappNumber = "+2349155004456";
  const [copiedStates, copiedStatesDispatch] = useReducer(LinkCopiedReducer, {
    whatsappCopied: false,
    emailCopied: false,
  });
  const emailAddress = "enweremproper@gmail.com";
  const navRef = useRef<HTMLElement | null>(null);

  const timeoutCopyMessage = (type: LinkCopiedActions) => {
    copiedStatesDispatch({ type, value: true });
    setTimeout(() => {
      copiedStatesDispatch({ type, value: false });
    }, 3000);
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <nav className="nav" ref={navRef}>
      <div className="nav__content">
        <Link to="/">
          <span className="nav__logo">
            <img src={logo} alt="PROSPER CODED LOGO" />
          </span>
        </Link>
        <NavLinks {...{ setOpenLinks, openLinks, navLinksRef }} />
        <div>
          <div className="nav__social-links">
            <TooltipLinks title={"Follow on GitHub"}>
              <a
                href="https://github.com/prospercoded"
                target="_blank"
                rel="noopener"
              >
                <ReactSVG src={GitHub} className="icon" />
              </a>
            </TooltipLinks>
            <TooltipLinks title={"Follow on facebook"}>
              <a
                href="https://www.facebook.com/profile.php?id=100073856271439"
                target="_blank"
                rel="noopener"
              >
                <ReactSVG src={FacebookIcon} className="icon" />
              </a>
            </TooltipLinks>
            <TooltipLinks
              title={
                copiedStates.whatsappCopied
                  ? "copied ✓"
                  : `Right-Click to Copy number \n (${whatsappNumber})`
              }
            >
              <a
                onContextMenu={(e) => {
                  copyToClipboard(whatsappNumber);
                  e.preventDefault();
                  timeoutCopyMessage(LinkCopiedActions.whatsapp);
                }}
                href="https://wa.me/2349155004456?text=Hello,%20I%20viewed%20your%20portfolio"
              >
                <ReactSVG src={WhatsappIcon} className="icon" />
              </a>
            </TooltipLinks>

            <Tooltip
              title={
                copiedStates.emailCopied
                  ? "Copied ✓"
                  : `Right-Click to Copy email \n (${emailAddress})`
              }
              arrow
              placement="bottom"
              trigger="hover"
              mouseLeaveDelay={1}
              color="var(--color-secondary)"
            >
              <a
                href={`mailto:${emailAddress}`}
                onContextMenu={(e) => {
                  copyToClipboard(emailAddress);
                  e.preventDefault();
                  timeoutCopyMessage(LinkCopiedActions.email);
                }}
              >
                <ReactSVG src={EmailIcon} className="icon mail" />
              </a>
            </Tooltip>
          </div>
          <button
            className="btn toggler"
            title="toggle"
            onClick={() => {
              console.log(navLinksRef.current);
              setOpenLinks((prev) => !prev);
              navLinksRef.current?.focus();
            }}
          >
            <ReactSVG src={NavTogglerIcon} className="icon " />
          </button>
        </div>

        <a href="/hire-me" className="btn btn--twist cta">
          Hire Me
        </a>
      </div>
    </nav>
  );
}

function NavLinks({
  openLinks,
  setOpenLinks,
  navLinksRef,
}: {
  openLinks: Boolean;
  setOpenLinks: React.Dispatch<React.SetStateAction<Boolean>>;
  navLinksRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className={"nav__links-container " + (openLinks && " open")}
      onBlur={() => {
        console.log("blur  work");
        setOpenLinks(false);
      }}
      tabIndex={1}
      ref={navLinksRef}
    >
      <ul className="nav__links">
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <a href={`${currentOrigin}#skills`}>Skills</a>
        </li>
        <li>
          {/* <Link to={`${currentOrigin}#projects`}>Projects</Link> */}
          <a href={`${currentOrigin}#projects`}>Projects</a>
          {/* <NavLink to="#projects">About</NavLink> */}
        </li>
        <li>
          {/* <NavLink to="/resume">Resume</NavLink> */}
          <a href="./static/resume.pdf" target="_blank">
            Resume
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Nav;
