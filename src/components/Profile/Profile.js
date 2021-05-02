/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./Profile.css";
import Navbar1 from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SpinnerCS from "../Spinner/SpinnerCS";
const monthArr = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function Profile() {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };

  const handleDelete = async (value) => {
    if (value) {
      await fetch("/deleteAccountPermanently", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      })
        .then(async (res) => {
          // eslint-disable-next-line no-unused-vars
          let data = await res.json();
          if (res.status === 200) {
            alert("user deleteAccountPermanently");
            history.push("/");
          }
        })
        .catch((error) => {
          alert("Something went wrong");
        });
    }
    setToggleModal(false);
  };

  const [user, setUser] = useState({});
  const [data, setData] = useState(false);
  const [allPhotosIndicator, setAllPhotosIndicator] = useState(true);
  const [imageArray, setImageArray] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState("");
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const history = useHistory();
  const toggleClass = (e) => {
    setAllPhotosIndicator(!allPhotosIndicator);
  };

  const toggleClass1 = (e) => {
    setAllPhotosIndicator(!allPhotosIndicator);
    let myImageArr = imageArray.length > 0 ? [imageArray[0]] : [];
    setRecentImages(myImageArr);
  };

  const [toggleModal, setToggleModal] = useState(false);
  const closeModal = (e) => {
    setToggleModal(false);
  };
  const openModal = (e) => {
    setToggleModal(true);
  };
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
      setAvatarImage(data.avatar);
      setUser(data);
      setImageArray(data.uploads);
      setData(true);
    }
  };

  const fileHandler = (e) => {
    setAvatar(e.target.files[0]);
    setIsAvatarSelected(true);
    alert("File selected");
  };

  const fileUploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", avatar);

    await fetch("/updateAvatar", {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        jwtHeader: initialState.token,
      },
    })
      .then(async (res) => {
        let data = await res.json();
        setAvatarImage(data.url);
        setIsAvatarSelected(false);
        alert("avatar updated");
      })
      .catch((err) => {
        alert("something went wrong");
      });
  };

  useEffect(() => {
    getUserProfile();
  });

  return (
    <>
      <Container>
        <Navbar1
          avatar={data ? user.avatar : null}
          firstName={
            data ? user.name.firstName + " " + user.name.lastName : null
          }
        />

        {data ? (
          <>
            <div className="border my-2 p-2">
              <Row>
                <Col
                  lg={12}
                  className="d-flex flex-column justify-content-center"
                >
                  <Row className="  w-100 d-flex justify-content-center">
                    <Image
                      src={avatarImage}
                      className="cursor-ptr"
                      style={{
                        width: "130px",
                        height: "130px",
                        borderRadius: "50%",
                      }}
                      onMouseOver={(e) => {
                        e.target.title = "click to update avatar";
                      }}
                    />
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <input
                      type="file"
                      name="image"
                      id="upload-btn"
                      onChange={fileHandler}
                      hidden={true}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <label
                      htmlFor="upload-btn"
                      className="link w-75 text-center cursor-ptr"
                    >
                      click to change avatar
                    </label>
                  </Row>
                  {isAvatarSelected ? (
                    <Row className="d-flex justify-content-center">
                      <Button
                        className=" "
                        onClick={fileUploadHandler}
                        style={{ width: "150px" }}
                      >
                        Upload
                      </Button>
                    </Row>
                  ) : null}
                </Col>
                <Col
                  className="d-flex flex-column justify-content-center align-items-center"
                  lg={12}
                >
                  <Row className=" ">
                    <Col className="d-flex align-items-center text-capitalize  ">
                      <span className="text-muted user-text">
                        {user.name.firstName + " " + user.name.lastName}
                      </span>
                    </Col>
                  </Row>
                  <Row className="">
                    <Col className="d-flex align-items-center">
                      <span className="fs-cs-1">{user.email}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            {imageArray.length > 0 ? (
              <>
                <div className="border">
                  <Row className="p-2">
                    <h3 className="ml-4" style={{ fontSize: "1.2rem" }}>
                      Total Images : {imageArray.length}
                    </h3>
                  </Row>
                  <Row className="p-1">
                    {imageArray.reverse().map((item, index) => {
                      let date = new Date(item.createdAt);
                      return (
                        <>
                          <Col
                            key={item._id}
                            lg={4}
                            md={12}
                            className="mb-5   w-100"
                          >
                            <div>
                              <img
                                src={item.imageUrl}
                                className="w-100 shadow-1-strong rounded border"
                                alt=""
                              />
                            </div>
                            <div className="d-flex justify-content-between bg-light p-2  d-flex flex-column p-2 border">
                              <span
                                className="text-center  w-100 p-1"
                                style={{ fontWeight: "bold" }}
                              >
                                Total Comments &nbsp;: &nbsp;
                                {item.comments.length}
                              </span>
                              <span
                                className="text-center   w-100 p-1 text-muted"
                                style={{ fontWeight: "700" }}
                              >
                                Uploaded on :
                                {" " +
                                  date.getDate() +
                                  "-" +
                                  monthArr[date.getMonth()] +
                                  "-" +
                                  date.getFullYear()}
                              </span>
                            </div>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex justify-content-center border text-muted"
                  style={{ height: "55vh" }}
                >
                  <h1>No Images to display</h1>
                </div>
              </>
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
      </Container>
    </>
  );
}

//  <>
//    <Col key={item._id} lg={4} md={12} className="mb-5">
//      <div>
//        <img
//          src={item.imageUrl}
//          className="w-100 shadow-1-strong rounded"
//          alt=""
//        />
//        <div className="d-flex justify-content-between bg-light p-2">
//          <span>
//            <FontAwesomeIcon
//              icon={faHeart}
//              size="lg"
//              className="whitecs red cursor-ptr"
//            />
//            &nbsp;
//            {item.likes}
//          </span>

//          <span>
//            <FontAwesomeIcon
//              icon={faComments}
//              size="lg"
//              className="whitecs blue cursor-ptr"
//            />
//            &nbsp; {item.comments.length}
//          </span>
//          <span>
//            <FontAwesomeIcon
//              icon={faTrash}
//              size="lg"
//              id={index}
//              onClick={toggleModalx(true, index)}
//              className="dlt cursor-ptr "
//            />
//          </span>
//        </div>
//      </div>
//    </Col>
//  </>;
