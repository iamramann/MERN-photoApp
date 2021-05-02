/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Image,
  Container,
  Spinner,
  Figure,
  Row,
  Col,
  Modal,
  Card,
  Button,
} from "react-bootstrap";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import fetchProgress from "fetch-progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Profile } from "../path";
import SpinnerCS from "../Spinner/SpinnerCS";
// import Navbar1 from "../Navbar/Navbar";
import {
  faPlus,
  faUpload,
  faHeart,
  faComments,
  faPaperPlane,
  faPowerOff,
  faTrash,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import "./userMain.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar1 from "../Navbar/Navbar";

export default function UserMain() {
  const [user, setUser] = useState({});
  const [imageArr, setImageArr] = useState([]);
  const [data, setData] = useState(false);
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValue, setFileValue] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [percent, setPercent] = useState(0);
  const [pBar, setPBar] = useState(false);

  const [imageDeleteConfirm, setImageDeleteConfirm] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [imgIndex, setImgIndex] = useState(-1);

  const getUserProfile = async (e) => {
    let response = await fetch("/userProfile", {
      method: "GET",
      mode: "cors",
      headers: {
        jwtHeader: initialState.token,
      },
    });
    let data = await response.json();
    if (data) {
      setUser(data);
      setImageArr(data.uploads);
      setData(true);
    }
  };

  useEffect(() => {
    console.log("her");
    getUserProfile();
  }, []);

  const tempAxios = () => {
    axios
      .get("/userProfilex")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const deleteHandler = (imgId) => {
    return fetch("/deleteCurrentPhoto", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        jwtHeader: initialState.token,
      },
      body: JSON.stringify({ imageId: imgId, id: user._id }),
    });
  };

  const toggleModalx = (value, index) => {
    return function () {
      setImgIndex(index);
      setToggleModal(value);
    };
  };

  const handleDelete = async (value) => {
    let imgId = imageArr[imgIndex]._id;
    if (value) {
      let response = await deleteHandler(imgId);
      let data = response.json();
      if (response.status === 200) {
        let newArr = imageArr.splice(imgIndex, 1);
        setImageArr([...imageArr]);
      } else {
        alert("error while deleting");
      }
    }
    setToggleModal(false);
  };

  const fileHandler = (e) => {
    setFileValue(e.target.value);
    setSelectedFile(e.target.files[0]);
  };

  const closeModal = (e) => {
    setToggleModal(false);
  };

  const imageDeletionAction = (value) => {
    setImageDeleteConfirm(value);
  };

  const fileUploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    setPBar(true);
    await fetch("/addNewImage", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then(
        fetchProgress({
          onProgress(progress) {
            // console.log(progress);
            setPercent(progress.percentage);
          },
          onError(err) {
            alert("Some error occured while uploading please try again");
          },
        })
      )
      .then(async (res) => {
        let data = await res.json();
        setImageArr((oldArr) => [
          ...oldArr,
          { imageUrl: data.url, likes: 0, comments: [] },
        ]);
        setUploadStatus(true);
        setSelectedFile(null);
        setPBar(false);
        setFileValue("");
      })
      .catch((err) => {
        alert("something went wrong");
        setPBar(false);
      });
  };

  const handleLikeBtn = (e) => {
    console.log(e.target.id);
    // return function () {
    // };
  };

  return (
    <>
      {initialState.isAuthenticated ? (
        <>
          <div
            className="container"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <Navbar1
              avatar={data ? user.avatar : null}
              firstName={
                data ? user.name.firstName + " " + user.name.lastName : null
              }
            />
          </div>

          {data ? (
            <>
              <Modal show={toggleModal}>
                <Modal.Header closeButton onClick={closeModal}>
                  <Modal.Title>Are you sure to delete this Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Once proceed your image will be permanently deleted.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      handleDelete(true);
                    }}
                  >
                    Proceed
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      handleDelete(false);
                    }}
                  >
                    Go Back
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* modal end */}

              <Container className="border ">
                <Row>
                  <Col
                    lg={8}
                    className="text-center txt fw-cs-400 italic fs-cs-1 d-flex align-items-center"
                  >
                    Hi{","}
                    {user.name.firstName.toUpperCase() +
                      " " +
                      user.name.lastName.toUpperCase()}
                    <br />
                    Add your latest photos 📷 to our photApp and let the world
                    explore you. what are you waiting for start sharing your
                    memories! 🎉
                    <br />
                    {fileValue ? "File Selected :" + fileValue : null}
                  </Col>
                  <Col lg={4} sm={12} className="d-flex flex-column">
                    <label
                      id="btn-label"
                      className={
                        "text-center " + (selectedFile ? "opacity8" : null)
                      }
                      htmlFor="upload-btn"
                    >
                      Add Photo <FontAwesomeIcon icon={faPlus} />
                    </label>
                    <label
                      className={
                        "bnt-style text-center " +
                        (!selectedFile ? "opacity8" : null)
                      }
                      onClick={fileUploadHandler}
                    >
                      Upload <FontAwesomeIcon icon={faUpload} />
                    </label>

                    <input
                      type="file"
                      name="image"
                      id="upload-btn"
                      onChange={fileHandler}
                      value={fileValue}
                      hidden={true}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </Col>
                </Row>
              </Container>

              {imageArr.length > 0 ? (
                <Container className="border mt-2">
                  <Row className="border-top p-1   ">
                    {imageArr.reverse().map((item, index) => {
                      const { _id, likes, comments, imageUrl } = item;
                      return (
                        <>
                          <Col key={_id} lg={4} md={12} className="mb-5">
                            <div>
                              <img
                                src={imageUrl}
                                className="w-100 shadow-1-strong rounded"
                                alt=""
                              />
                              <div className="d-flex justify-content-between grad-4 p-2">
                                <span style={{ color: "#fff" }}>
                                  <FontAwesomeIcon
                                    icon={faHeart}
                                    size="lg"
                                    id={index}
                                    onClick={handleLikeBtn}
                                    className="whitecs red cursor-ptr"
                                  />
                                  &nbsp;
                                  {likes}
                                </span>

                                <span style={{ color: "#fff" }}>
                                  <FontAwesomeIcon
                                    icon={faComments}
                                    size="lg"
                                    className="whitecs blue cursor-ptr"
                                  />
                                  &nbsp; {comments.length}
                                </span>
                                <span>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size="lg"
                                    id={index}
                                    onClick={toggleModalx(true, index)}
                                    className="dlt cursor-ptr "
                                  />
                                </span>
                              </div>
                            </div>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </Container>
              ) : (
                <div className="container w-100 border vh-100 d-flex justify-content-center align-items-center min-vh-x">
                  <Row>
                    <h1 className="text-muted fs-cs-2">No images to display</h1>
                  </Row>
                </div>
              )}
            </>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "82vh" }}
            >
              <SpinnerCS />
            </div>
          )}
          <Footer />
        </>
      ) : (
        history.push("/")
      )}
    </>
  );
}
