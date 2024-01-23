/* eslint-disable no-alert */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Header from "./Header";
import "./Home.scss";
import PageNation from "./PageNation";
import { url } from "../const";

export default function HomeID() {
  const link = "/login";
  const linkTitle = "ログイン";

  const [cookies,setCookie] = useCookies();
  const count = useSelector((state) => state.pages.value);//ページネーション用のカウントを取得
  const auth = useSelector((state) => state.auth.isSignIn);//ログイン状態の取得
  const [response, setResponse] = useState([]); //書籍一覧取得ステート

  //書籍一覧を受け取る
  useEffect(() => {

    /*ログイン状態の判定 
    ログインしているならトークン付きで していないならpublicのurlでAPI通信
    offsetに{count * 10}を指定しカウントにより取得する書籍位置が変わる
    */
    switch (auth) {
      case true:
        axios
          .get(`${url}/books?offset=${count * 10}`, {
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
        break;

      case false:
        axios
          .get(`${url}/public/books?offset=${count * 10}`)
          .then((res) => {
            setResponse(res.data);
          })
          .catch((err) => {
            alert(`エラー:${err.ErrorMessageJP}`);
          });
        break;

      default:
        break;
    }
    //第二引数にcountを指定しカウントが更新されれば一覧も更新されるようにする
  }, [count]);


  //ユーザー情報取得用 ログイン状態のみ動く
  if (auth) {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setCookie("name",res.data.name)
      })
      .catch((err) => {
        alert(`エラー:${err.ErrorMessageJP}`);
      });
  }

  return (
    <>
      <Header link={link} linkTitle={linkTitle} username={cookies.name} />
      <main>
        <h2>書籍一覧</h2>
        <div className="BookList">         
          {response.map((res) => (
            <li key={res.id} className="BookList__Title">
              <Link to={`/${res.id}`}>{Object.values(res.title)}</Link>
            </li>
          ))}
        </div>
        <PageNation count={count} length={response.length} />
      </main>
    </>
  );
}
