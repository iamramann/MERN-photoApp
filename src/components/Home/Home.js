/* eslint-disable no-unused-vars */
import {
  Navbar,
  Nav,
  Container,
  Image,
  Row,
  Col,
  Figure,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import {
  faPlus,
  faUpload,
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
export default function Home() {
  const [imageData, setImageData] = useState([]);

  async function checkIfUserIsLoggedInOrNot() {
    await fetch("/verifyUserLogin", {
      method: "GET",
      mode: "cors",
    }).then(async (res) => {
      let data = await res.json();

      if (res.status === 200 && res.statusText === "OK") {
        // setIsUserLoginIn(true);
      } else {
        // setIsUserLoginIn(false);
      }
    });
  }

  // async function getImages() {
  //   await fetch("https://picsum.photos/v2/list", {
  //     method: "GET",
  //   }).then(async (res) => {
  //     let data = await res.json();
  //     setImageData(data);
  //   });
  // }
  async function getAllUsersImagesFromDatabase() {
    await fetch("/getAllImages", {
      method: "GET",
    }).then(async (res) => {
      let data = await res.json();

      setImageData(data);
    });
  }

  useEffect(() => {
    // checkIfUserIsLoggedInOrNot();
    // getImages();
    getAllUsersImagesFromDatabase();
  }, []);

  // const [isUserLogIN, setIsUserLoginIn] = useState(true);

  return (
    <>
      <Container>
        <Navbar variant="dark" style={{ backgroundColor: "#4e73df" }}>
          <Navbar.Brand href="#home" style={{ fontSize: "1.5rem" }}>
            📸 PhotoApp
          </Navbar.Brand>

          {/* <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav> */}

          <Nav className="ml-auto">
            <NavLink to="/login" style={{ color: "#fff" }}>
              Login
            </NavLink>
          </Nav>
        </Navbar>
      </Container>
      <Container className="mt-5">
        <Row className="">
          {imageData.map((item, index) => {
            return (
              <Col
                key={item.id}
                lg={4}
                md={6}
                sm={12}
                className="mb-2 border d-flex justify-content-center"
              >
                <Figure>
                  <Image
                    src={item.imageUrl}
                    alt="..."
                    className=""
                    style={{ width: "225px", height: "225px" }}
                    fluid
                  />
                  <Row className="d-flex border-top  mx-2 mt-2  p-2 justify-content-between ">
                    <Col>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="red cursor-ptr             "
                        size="lg"
                        onMouseOver={(e) => {
                          e.target.classList.add("red");
                        }}
                        onMouseOut={(e) => {
                          e.target.classList.remove("red");
                        }}
                      />
                      <span>&nbsp;{item.likes}</span>
                    </Col>
                    <Col>
                      <FontAwesomeIcon
                        icon={faComment}
                        size="lg"
                        className="grey cursor-ptr"
                        onMouseOver={(e) => {
                          e.target.classList.add("grey");
                        }}
                        onMouseOut={(e) => {
                          e.target.classList.remove("grey");
                        }}
                      />
                      <span>&nbsp;{item.comments.length}</span>
                    </Col>
                    <Col>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="  cursor-ptr"
                        onMouseOver={(e) => {
                          e.target.classList.add("blue");
                        }}
                        onMouseOut={(e) => {
                          e.target.classList.remove("blue");
                        }}
                        size="lg"
                      />
                      <span style={{ color: "#fff" }}>
                        &nbsp;{item.comments.length}
                      </span>
                    </Col>
                  </Row>
                </Figure>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
