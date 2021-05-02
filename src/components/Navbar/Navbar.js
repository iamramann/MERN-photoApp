import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
const handleLogout = (e) => {
  console.log("here");
  localStorage.setItem("token", "");
  localStorage.removeItem("token");
};
function Navbar1(props) {
  return (
    <>
      <Navbar
        className="grad-1 border  nav-1 "
        sticky="top"
        variant="dark"
        expand="lg"
      >
        <NavLink to="/">
          <Navbar.Brand
            className=""
            style={{ fontStyle: "italic", fontWeight: "600" }}
          >
            photoApp
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle className="" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto  ">
            <NavLink
              className="nav-item  d-flex align-items-center flex-end"
              to="/profile"
            >
              <span style={{ textTransform: "capitalize" }}>
                <FontAwesomeIcon icon={faUser} /> {props.firstName}
              </span>
              &nbsp;
              {/* <Image
                src={props.avatar}
                className="d-none d-lg-block d-md-block"
                style={{ height: "30px", width: "30px" }}
              /> */}
            </NavLink>
            <NavLink
              className="nav-item  d-flex align-items-center flex-end"
              to="/"
            >
              <span
                style={{ textTransform: "capitalize" }}
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faPowerOff} />
                <span className=" "> Logout</span>
              </span>
              &nbsp;
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navbar1;
