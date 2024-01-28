import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { url } from "../const";

export default function EditBookReview() {
  const bookID = useParams();//書籍に登録されているIDを取得
  const navigate = useNavigate();
  const [errormessage, setErrormessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });
  const [coolies] = useCookies();//トークン取得用
  const [response, setResponse] = useState();//書籍詳細取得用

  // 書籍詳細を受け取ってresponseに格納
  useEffect(() => {
    axios
      .get(`${url}/books/${bookID.id}`, {
        headers: { Authorization: `Bearer ${coolies.token}` },
      })
      .then((res) => {
        setResponse(res.data);
        if(!res.data.isMine) navigate("/")
      })
      .catch((err) => {
        alert(err.response.ErrorMessageJP);
      });
  }, []);


  //form送信用 useFormを使ってdataとして受け取り送信
  const onSubmit = (data) => {
    axios
      .put(`${url}/books/${bookID.id}`, data, {
        headers: { Authorization: `Bearer ${coolies.token}` },
      })
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        setErrormessage(err.response.data.ErrorMessageJP);
      });
  };

  /**書籍削除用
   * 確認ダイアログ？としてwindow.confirmを使用
   * OKが押されれば削除を実行し、alertをならした後に一覧画面へ
   */
  function ReviewDelete() {
    const confirm = window.confirm("削除しますか？");
    if (confirm) {
      axios
        .delete(`${url}/books/${bookID.id}`, {
          headers: { Authorization: `Bearer ${coolies.token}` },
        })
        .then(() => {
          alert(`${response.title}:削除しました`);
          navigate("/");
        })
        .catch((err) => {
          setErrormessage(err.response.data.ErrorMessageJP);
        });
    }
  }


  /**
   * 特にロード画面は設けてない
   * responseがある場合に表示する
   * defaultValueを受け取ったresponseの中身に設定する
   */
  return (
    <>
      <Header />
      {response && (
        <main>
          <form onSubmit={handleSubmit(onSubmit)} className="ReviewForm">
            {errormessage && <p>{errormessage}</p>}
            {errors.title && <p>{errors.title.message}</p>}
            <label>
              タイトル
              <input
                className="ReviewForm__Title"
                type="text"
                defaultValue={response.title}
                {...register("title", {
                  required: { value: true, message: "入力が必須の項目です。" },
                })}
              />
            </label>
            <label>
              URL
              <input
                className="ReviewForm__url"
                type="text"
                defaultValue={response.url}
                {...register("url", {
                  required: { value: true, message: "入力が必須の項目です。" },
                })}
              />
            </label>
            <label>
              詳細
              <textarea
                className="ReviewForm__detail"
                type="textarea"
                defaultValue={response.detail}
                {...register("detail", {
                  required: { value: true, message: "入力が必須の項目です。" },
                })}
              />
            </label>
            <label>
              レビュー
              <textarea
                className="ReviewForm__review"
                type="textarea"
                defaultValue={response.review}
                {...register("review", {
                  required: { value: true, message: "入力が必須の項目です。" },
                })}
              />
            </label>
            <input type="submit" value="更新" />
          </form>
          <input
            type="button"
            value="レビュー削除"
            onClick={() => ReviewDelete()}
          />
        </main>
      )}
    </>
  );
}
