import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
// import FacebookLogo from "../../assets/icons/facebook.svg";
import { ReactSVG } from "react-svg";
// Icons
import FacebookIcon from "../../assets/icons/facebook.svg";
import WhatsappIcon from "../../assets/icons/whatsapp.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import NavTogglerIcon from "../../assets/icons/navtoggler.svg";
import { Tooltip } from "antd";
import { useRef, useState } from "react";
function Nav() {
  const [openLinks, setOpenLinks] = useState<Boolean>(false);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  return (
    <nav className="nav">
      <div className="nav__content">
        <span className="nav__logo">
          <img src={logo} alt="PROSPER CODED LOGO" />
        </span>
        {/* links goes here */}
        <NavLinks {...{ setOpenLinks, openLinks, navLinksRef }} />
        <div>
          <div className="nav__social-links">
            <a
              href="https://www.facebook.com/profile.php?id=100073856271439"
              title="FacebookLink"
              target="_blank"
              rel="noopener"
            >
              <ReactSVG src={FacebookIcon} className="icon" />
            </a>
            <a
              href="https://wa.me/2349155004456?text=Hello,%20I%20viewed%20your%20portfolio"
              title="WhatsappLink"
            >
              <ReactSVG src={WhatsappIcon} className="icon" />
            </a>

            <Tooltip
              title="Right-Click to Copy email "
              arrow
              placement="bottom"
            >
              <a href="mailto:enweremproper@gmail.com" title="Email">
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

        <button className="btn btn--twist cta">Hire Me</button>
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
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/resume">Resume</NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Nav;
