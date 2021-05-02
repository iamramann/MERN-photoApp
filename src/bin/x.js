<Modal show={toggleModal}>
  <Modal.Header closeButton onClick={closeModal}>
    <Modal.Title>Account Deletion confirmation</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are, you sure you want to delete this account. Once proceed this action
    can't be undone.
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
</Modal>;
{
  initialState.isAuthenticated ? (
    data ? (
      <>
        <Container className="border  mb-5 pb-3">
          <Row>
            <Col lg={12} className="d-flex flex-column justify-content-center">
              <Row className="  w-100 d-flex justify-content-center">
                <Image
                  src={avatarImage}
                  className="avatar cursor-ptr"
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
                <label htmlFor="upload-btn" className="link cursor-ptr">
                  click here to change avatar
                </label>
              </Row>
              {isAvatarSelected ? (
                <Row className="d-flex justify-content-center">
                  <Button className=" " onClick={fileUploadHandler}>
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
        </Container>
        <Container className="mb-5">
          <Row className="pt-3">
            <Col lg={6} sm={12}>
              <span
                className={
                  "border p-1 cursor-ptr mr-1  " +
                  (allPhotosIndicator ? "dark" : null)
                }
                onClick={toggleClass}
              >
                All Photos
              </span>
              <span
                className={
                  "border p-1 cursor-ptr " +
                  (allPhotosIndicator ? null : "dark")
                }
                onClick={toggleClass1}
              >
                Recent Photos
              </span>
            </Col>
            <Col lg={6}></Col>
          </Row>
        </Container>

        {imageArray.length > 0 && allPhotosIndicator ? (
          <Container
            className="bg-light border "
            style={{ minHeight: "500px" }}
          >
            <Row className="pt-3">
              {imageArray.map((item, index) => {
                let date = new Date(item.createdAt);
                return (
                  <Col
                    lg={3}
                    md={4}
                    sm={12}
                    className="mb-3 d-sm-flex justify-content-center"
                  >
                    <Figure key={index} className="cursor-ptr">
                      <Image className="img" src={item.imageUrl} />
                      <Figure.Caption className="text-center">
                        Total Comments : {item.comments.length}
                      </Figure.Caption>
                      <Figure.Caption>
                        Uploaded on :
                        {" " +
                          date.getDate() +
                          "-" +
                          monthArr[date.getMonth()] +
                          "-" +
                          date.getFullYear()}
                      </Figure.Caption>
                    </Figure>
                  </Col>
                );
              })}
            </Row>
          </Container>
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 h-100 ">
            <Spinner animation="grow" variant="primary" role="status" size="xl">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {recentImages.length > 0 && !allPhotosIndicator ? (
          <Container
            className="bg-light border "
            style={{ minHeight: "500px" }}
          >
            <Row className="pt-3">
              {recentImages.map((item, index) => {
                let date = new Date(item.createdAt);
                return (
                  <Col
                    lg={3}
                    md={4}
                    sm={12}
                    className="mb-3 d-sm-flex justify-content-center"
                  >
                    <Figure key={index} className="cursor-ptr">
                      <Image className="img" src={item.imageUrl} />
                      <Figure.Caption className="text-center">
                        Total Comments : {item.comments.length}
                      </Figure.Caption>
                      <Figure.Caption>
                        Uploaded on :
                        {" " +
                          date.getDate() +
                          "-" +
                          monthArr[date.getMonth()] +
                          "-" +
                          date.getFullYear()}
                      </Figure.Caption>
                    </Figure>
                  </Col>
                );
              })}
            </Row>
          </Container>
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Spinner animation="grow" variant="primary" role="status" size="xl">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        <Container className="border mt-3 ">
          <Row>
            <Col lg={12} className="text-right p-2 cursor-ptr">
              <span
                className="text-danger bg-light"
                id="dlt-btn"
                onClick={openModal}
                onMouseOver={(e) => {
                  e.target.style.textDecoration = "underline";
                }}
                onMouseOut={(e) => {
                  e.target.style.textDecoration = "none";
                }}
              >
                Delete Account
              </span>
            </Col>
          </Row>
        </Container>
      </>
    ) : (
      <div className="container w-100 border h-100 d-flex justify-content-center align-items-center min-vh">
        <Spinner animation="grow" variant="primary" role="status" size="xl">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  ) : (
    history.push("/")
  );
}
