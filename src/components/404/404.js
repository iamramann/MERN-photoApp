import { Image } from "react-bootstrap";
export default function NotFound() {
  return (
    <>
      <div className="">
        <Image
          src="./images/404.png"
          style={{ backgroundPosition: "center" }}
          alt="..."
          className=""
          fluid
        />
      </div>
    </>
  );
}
