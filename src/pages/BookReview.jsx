import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "./Header";
import { url } from "../const";
import "./BookReview.scss";

export default function BookReview() {
  const [coolies] = useCookies(); //投稿用のトークン取得用
  const bookID = useParams(); //urlとして設定した書籍のID取得用
  const [errorMessage, setErrorMessage] = useState();
  const [response, setResponse] = useState(); //APIレスポンス取得用
  const auth = useSelector((state) => state.auth.isSignIn);

  const link = "/login";
  const linkTitle = "ログイン";

  useEffect(() => {
    axios
      .get(`${url}/books/${bookID.id}`, {
        headers: { Authorization: `Bearer ${coolies.token}` },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.ErrorMessageJP);
      });
  }, []);

  const edit = `/${bookID.id}/edit`;

  /**ログイン時以外でも普通には入れてしまうので
   * ログインしている場合とそうでない場合で表示を変えている
   */
  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      {!auth && <p>ここからはログインが必要です</p>}
      {response && (
        <main>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="BookReview">
            <h1 className="BookReview__Title">{response.title}</h1>

            <p className="BookReview__Url">
              書籍URL:<Link to>{response.url}</Link>
            </p>

            <p className="BookReview__Reviewer">
              レビュワー:{response.reviewer}
            </p>

            <p className="BookReview__Detail">詳細:{response.detail}</p>

            <p className="BookReview__Review">レビュー:{response.review}</p>
          </div>
          {auth && <Link to={edit}>書籍編集</Link>}
        </main>
      )}
    </>
  );
}
