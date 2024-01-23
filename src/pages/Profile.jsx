/* eslint-disable consistent-return */
import axios from "axios"
//import { useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import { url } from "../const"

export default function Profile(){

    const navigate = useNavigate()


    const homeTitle = "ホーム"

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, errors },
      } = useForm({ reValidateMode: "onSubmit", criteriaMode: "all" });
const [cookies,setCookie] = useCookies()

    const onSubmit = (data) => {
        axios.put(`${url}/users`,data,{
            headers:{Authorization:`Bearer ${cookies.token}`}
        })
        .then((res)=>{
            setCookie("name",res.data.name)
          reset()
          navigate("/")
        })
 }

    return (
        <>
        <Header homeTitle={homeTitle}/>
        <h2>ユーザー情報更新</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <p>{errors.name.message}</p>}
            <label>ユーザーネーム
            <input type="text" defaultValue={cookies.name} placeholder={cookies.name}{...register("name", {
                required: { value: true, message: "入力が必須の項目です。" },
                validate: (text) => {
                    if(text === cookies.name) {return ("同じ名前では送信できません")}
                }
              })} /></label>
            <input type="submit" value="更新" disabled={!isDirty}/>
        </form>
        </>
    )
}