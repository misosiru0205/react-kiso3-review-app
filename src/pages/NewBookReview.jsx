import axios from "axios";

import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { url } from "../const";
import BooksForm from "./BooksForm";

export default function NewBookReview() {
  const [cookies] = useCookies(); //トークンの取得用
  const navigate = useNavigate(); //送信成功後にホームに戻るようにしておく為

  const [errormessage, setErrormessage] = useState();

  //送信アクション
  const onSubmit = (data) => {
    axios
      .post(`${url}/books`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        navigate("/"); //送信成功時ホームに戻るようにする
      })
      .catch((err) => {
        setErrormessage(err.response.data.ErrorMessageJP);
      });
  };

  return (
    <>
      <Header />
      <main>
      <h2>書籍レビュー投稿フォーム</h2>
      <BooksForm onSubmit={onSubmit} errormessage={errormessage}/>
      </main>
    </>
  );
}
