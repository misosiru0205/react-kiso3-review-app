/* eslint-disable consistent-return */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./Header";

export default function Signup() {
  const [errormessage, setErrormessage] = useState("");
  const [icon, setIcon] = useState();
  const [url, seturl] = useState("");
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [cookies,setCookie,removeCookie] = useCookies()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });

  const link = "/login";
  const linkTitle = "ログイン";

  function handleChangeIcon(e) {//アイコンの変換
    const file = e.target.files[0];
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 100,
      maxHeight: 100,
      convertSize: Infinity,
      success(result) {
        setIcon(result);
        seturl(window.URL.createObjectURL(result));
      },
      error(err) {
        console.log(err);
      },
    });
  }

  function resetmessage() {
    setErrormessage("");
    seturl("");
    setIcon("");
  }


    const onSubmit = (data) =>{

    const formData = new FormData();
    formData.append("icon", icon);
    
    const object = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    axios.
    post("https://railway.bookreview.techtrain.dev/users",object
    ).then((res)=>{
      setCookie("token",res.data.token)
      setCookie("log", true)
      console.log(res.data.token)

      axios.post("https://railway.bookreview.techtrain.dev/uploads",
        formData,
        {headers :{Authorization:`Bearer ${res.data.token}`}}
        
      ).then(()=>{
        resetmessage()
        reset()
        navigate("/")
      }).catch((err)=>{
        console.log(err)
        setErrormessage(`画像のアップロードに失敗しました : ${err.response.data.ErrorMessageJP}`)
      })
    }).catch((err)=>{
      setErrormessage(`サインアップに失敗しました : ${err.response.data.ErrorMessageJP}`)
    })
  }

  /*const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("icon", icon);

    try {
      const object = {
        name: data.username,
        email: data.email,
        password: data.password,
      };

      if (data.password !== data.checkpassword) {
        throw new Error("パスワードが一致しません");
      }

      await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(object),
      })
        .then(async (res) => {
          const responceObject = await res.json();
          if (res.status !== 200) {
            throw new Error(
              `サインアップに失敗しました。${responceObject.ErrorMessageJP}`,
            );
          }
          return responceObject.token;
        })
        .then(async (token) => {
          await fetch("https://railway.bookreview.techtrain.dev/uploads", {
            method: "POST",
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            body: formData,
          });
        });
      reset();
      resetmessage();
      navigate("/")
    } catch (err) {
      setErrormessage(`${err}`);
    }
  };*/

  return (
    <>
      <Header
        link={link}
        linkTitle={linkTitle}
      />
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
                validate:(text) =>{
                  if(text !== watch("password")){
                    return ("パスワードが一致していません")
                  }},
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
            <img src={url} />
          </div>
          <br />
          <input type="submit" value="サインアップ" disabled={!isDirty} />
        </form>
      </main>
    </>
  );
}
