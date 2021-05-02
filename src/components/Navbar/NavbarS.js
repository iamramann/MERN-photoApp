import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function NavbarS(props) {
  return (
    <>
      <Navbar
        className="grad-1 border  nav-1 "
        sticky="top"
        variant="dark"
        expand="lg"
      >
        <NavLink to="/">
          <Navbar.Brand className="" style={{ fontWeight: "600" }}>
            PhotoApp 📷
          </Navbar.Brand>
        </NavLink>
      </Navbar>
    </>
  );
}

export default NavbarS;
