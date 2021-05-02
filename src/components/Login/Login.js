/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import validator from "validator";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { NavLink, useHistory } from "react-router-dom";
import { Register } from "../path";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import NavbarS from "../Navbar/NavbarS";
export default function Login() {
  const state = useSelector((state) => state.token);
  const location = useLocation();
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.isEmail(user.email) && user.password.length > 0) {
      // eslint-disable-next-line no-unused-vars
      const res = await fetch("/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(async (res) => {
        const data = await res.json();
        if (res.status === 200 && res.statusText === "OK") {
          dispatch({
            type: "CHANGE_TOKEN",
            payload: data.token,
          });
          dispatch({
            type: "USER_DETAILS",
            payload: data.user,
          });

          dispatch({
            type: "CHECK_USER",
            payload: true,
          });
          localStorage.setItem("token", data.token);
          history.push("/userMain");
        } else {
          setErrors([data.message]);
        }
      });
      setUser({
        email: "",
        password: "",
      });
    } else {
      setErrors(["Not a valid input"]);
    }
  };

  const togglePassword = (e) => {
    let val = showPwd;

    setShowPwd(!val);
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };

  return (
    <>
      {initialState.isAuthenticated ? (
        history.go(1)
      ) : (
        <>
          <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <NavbarS />
          </Container>
          <Container className="border bg-light" style={{ minHeight: "80vh" }}>
            <Row className="">
              <Col lg={6} className="d-none d-lg-block      ">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "80vh" }}
                >
                  <Image
                    src="./images/login-page-img-1.svg"
                    alt="..."
                    className="loginImage"
                    fluid
                  />
                </div>
              </Col>
              <Col lg={6} className="border-left p-2">
                <div
                  className="d-flex justify-content-center align-items-center flex-column "
                  style={{ minHeight: "80vh" }}
                >
                  <h1 className="text-muted fs-c-2">Welcome user</h1>
                  <Form onSubmit={handleSubmit} className="my-3">
                    <Form.Group controlId="email">
                      <Form.Label className="fs-cs-1">
                        Email Address*
                      </Form.Label>
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
                    <Form.Group
                      controlId="formBasicPassword"
                      className="parent"
                    >
                      <Form.Label className="fs-cs-1">Password*</Form.Label>

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

                    {errors.length > 0 ? (
                      <Form.Text className="text-danger list-none-cs">
                        {errors.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </Form.Text>
                    ) : null}
                    <NavLink to={Register}>New user? Click here</NavLink>

                    <Button className="  w-100 mt-1 clr" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
