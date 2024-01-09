import React, { useState } from "react";

export function App (){

    const [Email,setEmail] = useState("")
    const [Name,setName] = useState("")
    const [ResultEmail,setResultEmail] = useState("")
    const [ResultName,setResultName] = useState("")

    function ChangeEmail(e){
        setEmail(e.target.value)
    }

    function ChangeName(e){
        setName(e.target.value)
    }


    function ClickText(){
        if(Email === ""){
        setResultEmail("Emailを入力してください")}

        if(Name === ""){
        setResultName("名前を入力してください")
        }
    }

    return(
        <main>
            <form>
                Email:
                <input type="text" value={Email} onChange={ChangeEmail} id="input-email"/>
                <br/>
                Name:
                <input type="text" value={Name} onChange={ChangeName} id="input-name"/>
                <input type="button" value="送信" onClick={ClickText} id="input-button"/>
                <p id="result-email">{ResultEmail}</p>
                <p id="result-name">{ResultName}</p>
            </form>
        </main>
    )
}