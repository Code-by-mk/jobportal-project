import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CodeWithMohit.</div>
      <div>
        <Link to={"https://www.facebook.com/share/KAp3U7Lp948Wg8PF/?mibextid=qi2Omg"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.linkedin.com/in/mohitkuvade2001?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/mohitkuvade2001"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/mohitsaini6997/profilecard/?igsh=b3Fpd3Fic292YWRk"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
