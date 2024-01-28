import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signOut } from "../authSlice";
import {  name } from "../usernameSlice";

function Header(props) {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignIn); //ログイン状態の取得
  const username = useSelector((state) => state.username.setName);
  const location = useLocation();

  function logout() {
    removeCookie("token"); //トークンの削除
    dispatch(signOut()); //ログイン状態をfalseにする
  }

  //初回レンダリング、リロード、navigate時に更新される
  useEffect(() => {
    dispatch(name());
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
