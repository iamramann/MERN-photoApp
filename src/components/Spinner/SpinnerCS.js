import { Spinner } from "react-bootstrap";
export default function SpinnerCS() {
  return (
    <>
      <Spinner animation="border" variant="primary" role="status" size="xl">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </>
  );
}
