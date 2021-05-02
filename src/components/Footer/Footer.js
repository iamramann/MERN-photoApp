import { Container, Row, Col } from "react-bootstrap";
export default function Footer() {
  return (
    <>
      <Container>
        <Row className="grad-1">
          <Col
            className="text-center d-flex text-center align-item-center   justify-content-center text-white"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <p className="text-center text-white mb-0">
              &copy; All rights reserved 2021-22 PhotoApp
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
