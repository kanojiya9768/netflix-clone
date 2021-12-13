import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show === true && "nav_black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        className="nav_logo"
        alt="logo"
      />

      <img
        className="nav_avatar"
        src="https://image.shutterstock.com/z/stock-vector-initial-v-gaming-esport-logo-design-template-inspiration-1514004080.jpg"
        alt="logo"
      />
    </div>
  );
}

export default Navbar;
