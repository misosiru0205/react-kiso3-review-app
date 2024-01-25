/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signIn } from "../authSlice";
import Header from "./Header";
import { url } from "../const";

export default function Login() {
  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate(); //Navigateの設定
  const dispatch = useDispatch(); //Dispatchの設定
  const auth = useSelector((state) => state.auth.isSignIn); //ログイン状態の取得
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(); //Cookieの設定

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });

  const link = "/signup";
  const linkTitle = "サインアップ";

  const onSubmit = (data) => {
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        setErrormessage("");
        reset();
        setCookie("token", res.data.token); //Cookieにトークンの保持
        dispatch(signIn()); //ログイン状態の更新
        navigate("/"); //レビュー一覧画面に遷移
      })
      .catch((err) => {
        setErrormessage(
          `サインインに失敗しました : ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

  //サインインしている場合はレビュー一覧に飛ぶ
  if (auth === true) return <Navigate to="/" replace />;

  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      <main>
        <h2>ログイン画面</h2>
        <p>{errormessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mailadress">
            メールアドレス
            <input
              type="text"
              id="email"
              {...register("email", {
                required: { value: true, message: "入力が必須の項目です。" },
                pattern: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                  message: "メールアドレスの形式が違います。",
                },
              })}
              placeholder="メールアドレス"
            />
          </label>
          {errors.email && <div>{errors.email.message}</div>}
          <br />
          <label className="password">
            パスワード
            <input
              type="password"
              id="password"
              {...register("password", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
              placeholder="パスワード"
            />
          </label>
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <input type="submit" value="ログイン" disabled={!isDirty} />
        </form>
      </main>
    </>
  );
}
