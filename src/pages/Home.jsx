/* eslint-disable no-alert */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector,useDispatch } from "react-redux";
import Header from "./Header";
import "./Home.scss";
import PageNation from "./PageNation";
import { url } from "../const";
import LoadNow from "./isLoading";//ロード画面表示用
import { loadStart,loadEnd } from "../loadingSlice";

export default function Home() {
  const link = "/login";
  const linkTitle = "ログイン";

  const [cookies] = useCookies();
  const dispatch = useDispatch()
  const count = useSelector((state) => state.pages.value); //ページネーション用のカウントを取得
  const auth = useSelector((state) => state.auth.isSignIn); //ログイン状態の取得
  const isLoading = useSelector((state) => state.loadState.isLoading)//読み込みの状態管理
  const [response, setResponse] = useState(); //書籍一覧取得ステート

  //書籍一覧を受け取る
  useEffect(() => {
    /*ログイン状態の判定 
    ログインしているならトークン付きで していないならpublicのurlでAPI通信
    offsetに{count * 10}を指定しカウントにより取得する書籍位置が変わる
    */
    dispatch(loadStart()); //書籍情報取得開始
    if (auth === true) {
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
          alert(`エラー:${err.response.data.ErrorMessageJP}`);
        }).finally(()=>{
          dispatch(loadEnd())//書籍情報取得終了
        })
    } else {
      axios
        .get(`${url}/public/books?offset=${count * 10}`)
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          alert(`エラー:${err.response.data.ErrorMessageJP}`);
        })
        .finally(()=>{
          dispatch(loadEnd()); //書籍情報取得終了
        })
    }
    //第二引数にcountを指定しカウントが更新されれば一覧も更新されるようにする
  }, [count]);

  /**
   * 書籍詳細偏移時にlogの送信を行う
   * 書籍のidを受け取り{selectBookId:BookId}として送信
   */
  function PostLog(BookId) {
    if(auth){
    axios
      .post(
        `${url}/logs`,
        { selectBookId: BookId },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        },
      )
      .catch((err) => {
        alert(`エラー:${err.response.data.ErrorMessageJP}`);
      })};
  }

  /**
   * isLoadingがtrueなら<loading/>を表示し
   * isLoadingがfalseでresponseの中身があるなら書籍一覧を表示する
   */
  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      {isLoading && <LoadNow />}
      {response && !isLoading && (
        <main>
          <h2>書籍一覧</h2>
          <div className="BookList">
            <ul className="BookList__Container">
              {response.map((res) => (
                <li key={res.id} className="BookList__Title">
                  <Link
                    to={`/detail/${res.id}`}
                    onClick={() => PostLog(res.id)}
                  >
                    {Object.values(res.title)}
                  </Link>
                  {res.isMine && (
                    <Link to={`/edit/${res.id}`}>(編集)</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <PageNation count={count} length={response.length} />
          <br />
          {auth && <Link to="/new">書籍投稿</Link>}
        </main>
      )}
    </>
  );
}
