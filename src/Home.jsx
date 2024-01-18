/* eslint-disable no-alert */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./Header";

export default function Home() {
  const link = "/signup";
  const linkTitle = "サインアップ";
  const [cookies] = useCookies()


  const [response, setResponse] = useState([]);

  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/books", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        alert(`エラー:${err.ErrorMessageJP}`);
      });
  }, []);

  console.log(response);

  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      {response.map((res) => (
        <Link to={`/${res.id}`} key={res.id}>
          {Object.values(res.title)}
        </Link>
      ))}
    </>
  );
}
