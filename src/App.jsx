import React, { useState } from "react";

export function App (){

    const [text,setText] = useState("")
    const [test,setTest] = useState("未入力")

    function ChangeText(e){
        setText(e.target.value)
    }

    function ClickText(){
        if(text !== ""){
        setTest(text)}
    }

    return(
        <main>
            <form>
                <input type="text" value={text} onChange={ChangeText} required/>
                <input type="button" value="入力" onClick={ClickText} />
                <p>{test}</p>
            </form>
        </main>
    )
}