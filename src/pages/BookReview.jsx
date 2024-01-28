import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "./Header";
import { url } from "../const";
import LoadNow from "./isLoading";
import "./BookReview.scss";
import { loadStart,loadEnd } from "../loadingSlice";

export default function BookReview() {
  const [cookies] = useCookies(); //投稿用のトークン取得用
  const dispatch = useDispatch()
  const bookID = useParams(); //urlとして設定した書籍のID取得用
  const [errorMessage, setErrorMessage] = useState();
  const [response, setResponse] = useState(); //APIレスポンス取得用
  const isLoading = useSelector((state) => state.loadState.isLoading)
  const auth = useSelector((state) => state.auth.isSignIn);

  const link = "/login";
  const linkTitle = "ログイン";

  useEffect(() => {
    if (auth) {
      dispatch(loadStart())
      axios
        .get(`${url}/books/${bookID.id}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.ErrorMessageJP);
          
        }).finally(()=>{
          dispatch(loadEnd())
        })
    }
  }, []);

  /**
   * isLoadingがtrueなら<loading/>を表示し
   * isLoadingがfalseでresponseの中身があるなら書籍一覧を表示する
   */
  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      {auth !== true && <p>ここからはログインが必要です</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {isLoading && <LoadNow />}
      {response && !isLoading && (
        <main>
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
        </main>
      )}
    </>
  );
}
