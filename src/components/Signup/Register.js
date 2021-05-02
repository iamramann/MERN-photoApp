/* eslint-disable no-unused-vars */
// import { getByDisplayValue } from "@testing-library/dom";
import React, { useState } from "react";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";
import { Login } from "../path";
import NavbarS from "../Navbar/NavbarS";
import Footer from "../Footer/Footer";
// import validator from "validator";

export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [viewFaCheck, setViewFaCheck] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validator.isEmail(user.email) && user.password.length > 0) {
    const res = await fetch("/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        let data = await res.json();

        if (res.status === 201) {
          alert("Click to go to login page");
          history.push("/login");
        } else if (res.status === 422) {
          setErrors([data.message]);
          // alert(data.message);
        } else if (res.status === 500) {
          setErrors([data.message]);
          // alert(data.message);
        }

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setViewFaCheck(false);
      })
      .catch((error) => {
        alert("something went wrong");
      });
  };

  const togglePassword = (e) => {
    let val = showPwd;
    setShowPwd(!val);
  };
  const toggleCPassword = (e) => {
    let val = showCPwd;
    setShowCPwd(!val);
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "password") {
      if (value === user.confirmPassword && user.confirmPassword.length > 0) {
        setViewFaCheck(true);
      } else {
        setViewFaCheck(false);
      }
    }
    if (name === "confirmPassword") {
      if (value === user.password && user.password.length > 0) {
        setViewFaCheck(true);
      } else {
        setViewFaCheck(false);
      }
    }
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Container
        className="border"
        style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <NavbarS />

        <Row className="m-2">
          <Col lg={7} className="d-none d-lg-block">
            <Image
              src="./images/signup-page-img-1.svg"
              alt="..."
              className="loginImage my-3"
              fluid
            />
          </Col>
          <Col lg={5}>
            <h1 className="text-muted" style={{ fontSize: "1.8rem" }}>
              Welcome to PhotoApp
            </h1>

            {errors.length > 0
              ? errors.map((err, index) => {
                  return (
                    <li
                      className="text-danger text-capitalize error-msg"
                      key={index}
                    >
                      {err}
                    </li>
                  );
                })
              : null}
            <div className="  d-flex justify-content-center align-items-center p-2 m-2">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group controlId="firstname">
                      <Form.Label className="fs-cs-1">First Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        className="margin-b"
                        onChange={handleInputs}
                        value={user.name}
                        placeholder="Enter your First Name"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group controlId="lastname">
                      <Form.Label className="fs-cs-1">Last Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        className="margin-b"
                        onChange={handleInputs}
                        value={user.name}
                        placeholder="Enter your Last Name"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="email">
                  <div className="d-flex">
                    <Form.Label className="fs-cs-1 mr-2">
                      Email Address*
                    </Form.Label>
                  </div>
                  <Form.Control
                    type="email"
                    name="email"
                    className="margin-b"
                    onChange={handleInputs}
                    value={user.email}
                    placeholder="Enter your email"
                  ></Form.Control>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="parent">
                  <div className="d-flex justify-content-between">
                    <Form.Label className="fs-cs-1">Password*</Form.Label>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={!viewFaCheck ? "d-none" : "tick-icon"}
                    />
                  </div>
                  <Form.Control
                    type={showPwd ? "text" : "password"}
                    className="margin-b"
                    placeholder="Password"
                    value={user.password}
                    name="password"
                    onChange={handleInputs}
                  />
                  <FontAwesomeIcon
                    icon={showPwd ? faEyeSlash : faEye}
                    className="eyeIcon"
                    onClick={togglePassword}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCPassword" className="parent">
                  <div className="d-flex justify-content-between">
                    <div>
                      <Form.Label className="fs-cs-1">
                        Confirm Password*
                      </Form.Label>
                      {!viewFaCheck ? (
                        <Form.Text className="text-muted">
                          Both password must be same
                        </Form.Text>
                      ) : null}
                    </div>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={!viewFaCheck ? "d-none" : "tick-icon"}
                    />
                  </div>
                  <Form.Control
                    type={showCPwd ? "text" : "password"}
                    className="margin-b"
                    placeholder="Confirm password"
                    value={user.confirmPassword}
                    name="confirmPassword"
                    onChange={handleInputs}
                  />
                  <FontAwesomeIcon
                    icon={showCPwd ? faEyeSlash : faEye}
                    className="eyeIcon"
                    onClick={toggleCPassword}
                  />
                </Form.Group>
                <NavLink to={Login}>Already Registered? Click here</NavLink>
                {/* <a href="/login">Already Registered? Click here</a> */}
                <Button className="  w-100 mt-1 clr" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        <Footer />
      </Container>
    </>
  );
}
