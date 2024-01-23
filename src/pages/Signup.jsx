/* eslint-disable no-new */
/* eslint-disable consistent-return */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { signIn } from "../authSlice";
import { url } from "../const";

export default function Signup() {
  const [errormessage, setErrormessage] = useState("");
  const [icon, setIcon] = useState();
  const [iconUrl, setIconUrl] = useState("");
  const navigate = useNavigate();//Navigateの設定
  const dispatch = useDispatch();//Dispatchの設定
  const auth = useSelector((state) => state.auth.isSignIn);//ログイン状態の取得
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();//Cookieの設定

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });

  const link = "/login";
  const linkTitle = "ログイン";

  function handleChangeIcon(e) {
    //アイコンの変換
    const file = e.target.files[0];

    new Compressor(file, {
      quality: 0.8,
      maxWidth: 100,
      maxHeight: 100,
      convertSize: Infinity,
      success(result) {
        setIcon(result);
        setIconUrl(window.URL.createObjectURL(result));
      },
      error(err) {
        console.log(err);
      },
    });
  }

  function resetmessage() {
    setErrormessage("");
    setIconUrl("");
    setIcon("");
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("icon", icon);

    const object = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${url}/users`, object)
      .then((res) => {
        setCookie("token", res.data.token);//トークンの設定
        dispatch(signIn());

        axios
          .post(`${url}/uploads`, formData, {
            headers: { Authorization: `Bearer ${res.data.token}` },
          })
          .then(() => {
            resetmessage();
            reset();
            navigate("/");//レビュー一覧画面に遷移
          })
          .catch((err) => {
            setErrormessage(
              `画像のアップロードに失敗しました : ${err.response.data.ErrorMessageJP}`,
            );
          });
      })
      .catch((err) => {
        setErrormessage(
          `サインアップに失敗しました : ${err.response.data.ErrorMessageJP}`,
        );
      });
  };


  //サインインしている場合はレビュー一覧に飛ぶ
  if (auth === true) return <Navigate to="/" replace />;

  return (
    <>
      <Header link={link} linkTitle={linkTitle} />
      <main>
        <h2>ユーザー新規作成</h2>
        <p>{errormessage}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="username">
            ユーザーネーム
            <input
              {...register("username", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
              type="text"
              id="name"
              placeholder="ユーザーネーム"
            />
          </label>
          {errors.username && <div>{errors.username.message}</div>}
          <br />
          <label className="mailadress">
            メールアドレス
            <input
              {...register("email", {
                required: { value: true, message: "入力が必須の項目です" },
                pattern: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                  message: "メールアドレスの形式が違います。",
                },
              })}
              type="text"
              id="email"
              placeholder="メールアドレス"
            />
          </label>
          {errors.email && <div>{errors.email.message}</div>}
          <br />
          <label className="password">
            パスワード
            <input
              {...register("password", {
                required: { value: true, message: "入力が必須の項目です。" },
                pattern: {
                  value: /^[A-Za-z0-9]*$/,
                  message: "英数字のみで入力してください。",
                },
                minLength: { value: 8, message: "8文字以上入力してください" },
              })}
              type="password"
              id="password"
              placeholder="パスワード"
            />
          </label>
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <label className="password">
            パスワード(確認用)
            <input
              {...register("checkpassword", {
                required: { value: true, message: "入力が必須の項目です" },
                validate: (text) => {
                  if (text !== watch("password")) {
                    return "パスワードが一致していません";
                  }
                },
              })}
              type="password"
              id="checkpassword"
              placeholder="もう一度入力してください"
            />
          </label>
          {errors.checkpassword && <div>{errors.checkpassword.message}</div>}
          <br />
          <label className="icon">
            アイコン選択
            <input
              id="icon"
              type="file"
              accept=".jpg,.png"
              required
              onChange={(e) => handleChangeIcon(e)}
            />
          </label>
          <div className="iconview">
            {iconUrl && <img src={iconUrl} alt="選択画像" />}
          </div>
          <br />
          <input type="submit" value="サインアップ" disabled={!isDirty} />
        </form>
      </main>
    </>
  );
}
