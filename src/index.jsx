import React from "react"; 
import * as ReactDOM from 'react-dom/client'

import { BrowserRouter,Routes,Route } from "react-router-dom";
import { App } from "./App";

const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App/>} />
    </Routes>
    </BrowserRouter>
)

//path='/' でメインに設定 '/'の後に好きな単語を入れてアドレスを作れる