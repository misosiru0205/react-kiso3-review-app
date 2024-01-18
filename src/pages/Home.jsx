/* eslint-disable no-alert */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./Header";
import "./Home.scss";

export default function Home() {
  const link = "/signup";
  const linkTitle = "サインアップ";
  const [cookies] = useCookies();

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
  }, [cookies]);

  console.log(response);

  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      <main>
        <div className="books-List">
          <h2 className="books-List__Title">書籍一覧</h2>
            {response.map((res) => (
              <li key={res.id} className="books-List__BookTitle">
                <Link to={`/${res.id}`} >
                  {Object.values(res.title)}
                </Link>
              </li>
            ))}
        </div>
      </main>
    </>
  );
}
