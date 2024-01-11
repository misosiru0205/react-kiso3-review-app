import { useState } from "react"

export default function Signup(){



    const [Username,setUsername] = useState("");
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");

    function handleChangeUsername(e){
        setUsername(e.target.value)
    }

    function handleChangeEmail(e){
        setEmail(e.target.value)
    }

    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    function Click(){
        const sousin = {
            Username,
            Email,
            Password,
        }

        console.log(sousin)
    }

    return(
        <form>
            <label className="username">ユーザーネーム</label>
            <input type="text" id="name" value={Username} onChange={(e) =>handleChangeUsername(e)} placeholder="ユーザーネーム"/>
            <br/>
            <label className="mailadress">メールアドレス</label>
            <input type="text" id="email" value={Email} onChange={(e)=>handleChangeEmail(e)} placeholder="メールアドレス"/>
            <br/>
            <label className="password">パスワード</label>
            <input type="text" id="password" value={Password} onChange={(e)=>handleChangePassword(e)} placeholder="パスワード"/>
            <br/>
            <input type="button" value="送信" onClick={Click}/>
        </form>
    )

}