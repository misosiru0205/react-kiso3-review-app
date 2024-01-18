/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "./Header";

export default function Login() {
  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
      .post("https://railway.bookreview.techtrain.dev/signin", data)
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        setErrormessage("");
        reset();
        setCookie("token", res.data.token);
        setCookie("log", true);
        navigate("/");
      })
      .catch((err) => {
        setErrormessage(
          `サインインに失敗しました : ${err.response.data.ErrorMessageJP}`,
        );
      });
  };

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
