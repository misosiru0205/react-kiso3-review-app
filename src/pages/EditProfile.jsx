/* eslint-disable consistent-return */
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import { url } from "../const";

export default function EditProfile() {
  const [username,setUsername] = useState()//Headerから値を取得するステート
  const navigate = useNavigate();
  const [cookies] = useCookies(); //トークン取得用
  const [errormessage, setErrormessage] = useState();
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });

  const onSubmit = (data) => {
    axios
      .put(`${url}/users`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        alert(`更新成功:${res.data.name}`); //成功時のアラート
        navigate("/");
      })
      .catch((err) => {
        setErrormessage(err.response.data.ErrorMessageJPP);
      });
  };



  /**defaultValue={cookies.name}で初期値をユーザー名にする
   * ついでにplaceholder={cookies.name} とし全部消してしまっても元が何だったかわかるようにする
   * validateとして入力値とcookies.nameを比べ同じであればerrorを返す
   * useFormで{name:text}で受け取ってonSubmitに送りAPI通信でPUTする
   * Header呼び出し時にsetstateを渡して値を受け取る
   */
  return (
    <>
      <Header setUsername={(setname)=>setUsername(setname)}/>
      <main>
        <h2>ユーザー情報更新</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="EditProfile">
          {errormessage && <p>{errormessage}</p>}
          {errors.name && <p>{errors.name.message}</p>}
          <label className="EditProfile__Name">
            ユーザーネーム
            <input
              className="EditProfile__Name--Input"
              type="text"
              defaultValue={username}
              placeholder={username}
              {...register("name", {
                required: { value: true, message: "入力が必須の項目です。" },
                validate: (text) => {
                  if (text === username) {
                    return "同じ名前では送信できません";
                  }
                },
              })}
            />
          </label>
          <input
            className="EditProfile__Submit"
            type="submit"
            value="更新"
            disabled={!isDirty}
          />
        </form>
      </main>
    </>
  );
}
