 const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
    return state.user;
  });

  const checkUser = useSelector((state) => {
    return state.isUserLoggedIn;
  });

  const getToken = useSelector((state) => {
    let token = state.token;

    return token;
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValue, setFileValue] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [percent, setPercent] = useState(0);
  const [pBar, setPBar] = useState(false);
  const [isUserLogIN, setIsUserLoginIn] = useState(false);
  const [dltImgId, setDltImgId] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };

  const deleteImage = (id) => {
    console.log(id);
  };

  const deleteHandler = async (e) => {
    console.log(e.target.id);

    await fetch("/deleteCurrentPhoto", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        jwtHeader: initialState.token,
      },
      body: JSON.stringify({ imageId: e.target.id, id: userDetails._id }),
    })
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };

  const handleLikeBtn = (e) => {};

  async function checkIfUserIsLoggedInOrNot() {
    await fetch("/verifyUserLogin", {
      method: "GET",
      mode: "cors",
    }).then(async (res) => {
      let data = await res.json();
      if (res.status === 200 && res.statusText === "OK") {
        setIsUserLoginIn(true);
      } else {
        setIsUserLoginIn(false);

        history.push("/");
      }
    });
  }

  const fileHandler = (e) => {
    setFileValue(e.target.value);
    setSelectedFile(e.target.files[0]);
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
            setPercent(progress.percentage);
          },
          onError(err) {
            alert("Some error occured while uploading please try again");
          },
        })
      )
      .then(async (res) => {
        let data = await res.json();
        setImageArray(data.uploads);
        let x = userDetails;
        x.uploads.push({ imageUrl: data.url, likes: 0, comments: [] });
        dispatch({ type: "USER_DETAILS", payload: x });
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

  return (
    <>
      {checkUser ? (
        <>
          <Container>
            <Row className="header p-3">
              <Col sm={8}>
                <p className="appName mb-0 text-capitalize">
                  PhotoApp
                  <span style={{ fontSize: "1.2rem" }}>
                    &nbsp; Hi👋&nbsp;{userDetails.name.firstName}
                  </span>
                </p>
              </Col>
              <Col className="d-flex flex-row-reverse" sm={4}>
                {userDetails.avatar.length > 0 ? (
                  <NavLink to={Profile}>
                    <Image
                      src={userDetails.avatar}
                      className="avatar"
                      alt="user avatar"
                      style={{ width: "55px", height: "55px" }}
                      title={
                        userDetails.name.firstName +
                        " " +
                        userDetails.name.lastName
                      }
                    />
                  </NavLink>
                ) : null}
              </Col>
            </Row>
          </Container>
          <Container className="border">
            <Row className="">
              <Col lg={6} sm={12} className="mt-4 w-100">
                {pBar ? <ProgressBar completed={percent} /> : null}
              </Col>
              <Col lg={6} sm={12} className="d-flex flex-row-reverse ">
                <label className="bnt-style" onClick={fileUploadHandler}>
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
                <label id="btn-label" htmlFor="upload-btn">
                  Add Photo <FontAwesomeIcon icon={faPlus} />
                </label>
              </Col>
            </Row>
          </Container>
          <Container className="mt-1 border-bottom border-left border-right">
            <Row className="p-1 d-flex justify-content-center">
              {userDetails.uploads.length > 0 ? (
                userDetails.uploads.map((item, index) => {
                  console.log(item);
                  return (
                    <Col
                      key={item._id}
                      lg={3}
                      md={6}
                      sm={12}
                      className="my-3 mx-4 border "
                    >
                      <Figure>
                        <Image
                          src={item.imageUrl}
                          alt="..."
                          className="my-image "
                          fluid
                        />
                        <Row className="d-flex border-top  mx-2 mt-2  p-2 justify-content-between ">
                          <Col>
                            <FontAwesomeIcon
                              icon={faHeart}
                              className="red cursor-ptr             "
                              size="lg"
                              onClick={handleLikeBtn}
                              value={item.likes}
                              onMouseOver={(e) => {
                                if (!e.target.classList.contains("red"))
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
                          </Col>
                          <Col>
                            <label
                              className="cursor-ptr text-danger link"
                              id={item._id}
                              onClick={deleteHandler}
                            >
                              Delete
                              {/* <FontAwesomeIcon
                                icon={faTrash}
                                className="cursor-ptr"
                                id={item._id}
                                size="lg"
                              /> */}
                            </label>
                          </Col>
                        </Row>
                      </Figure>
                    </Col>
                  );
                })
              ) : (
                <h1>No Images to display...</h1>
              )}
            </Row>
          </Container>
        </>
      ) : (
        history.push("/")
      )}
    </>
  );