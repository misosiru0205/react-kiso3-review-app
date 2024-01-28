import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { url } from "../const";

export default function NewBookReview() {
  const [cookies] = useCookies(); //トークンの取得用
  const navigate = useNavigate(); //送信成功後にホームに戻るようにしておく為
  const {
    //送信用のuseForm
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });
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
        <p>{errormessage}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="ReviewForm">
          <label>
            タイトル{errors.title && `:${errors.title.message}`}
            <input
              className="ReviewForm__Title"
              type="text"
              {...register("title", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <label>
            URL{errors.url && `:${errors.url.message}`}
            <input
              className="ReviewForm__url"
              type="text"
              {...register("url", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <label>
            詳細{errors.detail && `:${errors.detail.message}`}
            <textarea
              className="ReviewForm__detail"
              type="textarea"
              {...register("detail", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <label>
            レビュー内容{errors.review && `:${errors.review.message}`}
            <textarea
              className="ReviewForm__review"
              type="textarea"
              {...register("review", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <input type="submit" value="送信" disabled={!isDirty} />
        </form>
      </main>
    </>
  );
}
