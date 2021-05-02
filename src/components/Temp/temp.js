/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export default function Temp() {
  const history = useHistory();
  const [data, setData] = useState("");
  async function getUserData() {
    let response = await fetch("/test", {
      method: "GET",
      mode: "cors",
    }).then(async (res) => {
      let data = await res.json();
      if (res.status === 200 && res.statusText === "OK") {
        console.log(data);
        setData("data");
        console.log(data);
      } else {
        setData("");
        history.push("/login");
      }
    });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <h1>There are my values</h1>
      ) : (
        <h2>this is protected route</h2>
      )}
    </>
  );
}
