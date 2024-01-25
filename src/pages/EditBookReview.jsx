import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import { url } from "../const";

export default function EditBookReview() {
  const bookID = useParams();
  const navigate = useNavigate();
  const [errormessage, setErrormessage] = useState();
  const review = `/${bookID.id}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });
  const [coolies] = useCookies();
  const [response, setResponse] = useState();

  useEffect(() => {
    axios
      .get(`${url}/books/${bookID.id}`, {
        headers: { Authorization: `Bearer ${coolies.token}` },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        alert(err.response.ErrorMessageJP);
      });
  }, []);

  const onSubmit = (data) => {
    axios
      .put(`${url}/books/${bookID.id}`, data, {
        headers: { Authorization: `Bearer ${coolies.token}` },
      })
      .then(() => {
        navigate(`/${bookID.id}`);
      })
      .catch((err) => {
        setErrormessage(err.response.data.ErrorMessageJP);
      });
  };


  function ReviewDelete(){
  axios.delete(`${url}/books/${bookID.id}`,{
    headers:{Authorization:`Bearer ${coolies.token}`}
  }).then(()=>{
    alert("削除に成功")
    navigate("/")
  }).catch((err)=>{
    setErrormessage(err.response.data.ErrorMessageJP)
  })
}


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
            <input type="submit" value="送信" />
          </form>
          <input type="button" value="レビュー削除" onClick={() => ReviewDelete()} disabled />
          <Link to={review}>戻る</Link>
        </main>
      )}
    </>
  );
}
