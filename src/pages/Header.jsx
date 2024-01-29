import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "../authSlice";
import { url } from "../const";


function Header(props) {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignIn); //ログイン状態の取得
  const [username,setUsername] = useState()
  const location = useLocation();

  function logout() {
    removeCookie("token"); //トークンの削除
    setUsername()
    dispatch(signOut()); //ログイン状態をfalseにする
  }

  //初回レンダリング、リロード、navigate時に更新される
  useEffect(() => {
    if(auth){
    axios.get(`${url}/users`,{
      headers:{Authorization:`Bearer ${cookies.token}`}
    }).then((res)=>{
      setUsername(res.data.name)
      if(location.pathname === "/profile") props.setUsername(res.data.name) //親コンポーネントからstateを渡して子コンポーネントで値を入れる
    }).catch((err)=>{
      alert(err.response.data.ErrorMessageJP)
    })}
  }, []);

  return (
    <header>
      <div className="HeaderTitle">
        <h1>書籍レビューApp</h1>
        {username && <p className="username">Name : {username}</p>}
      </div>

      <div className="LinkContainer">
        {auth ? (
          <div>
            <Link to="/login" onClick={() => logout()}>
              ログアウト
            </Link>
            <br />
            {location.pathname === "/" && (
              <Link to="/profile">ユーザーネーム更新</Link>
            )}
            {location.pathname !== "/" && <Link to="/">ホーム</Link>}
          </div>
        ) : (
          <>
            <Link to={props.link}>{props.linkTitle}</Link>
            <br />
            {location.pathname !== "/" && <Link to="/">ホーム</Link>}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
