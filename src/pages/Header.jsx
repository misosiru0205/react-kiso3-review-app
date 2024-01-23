import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../authSlice";

function Header(props) {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignIn);//ログイン状態の取得

  function logout() {
    removeCookie("token");//トークンの削除
    removeCookie("name")
    dispatch(signOut());//ログイン状態をfalseにする
  }

  return (
    <header>
      <div>
        <h1>書籍レビューApp</h1>
      </div>

      <div className="LinkContainer">
        {auth ? (
          <div><Link to="/login" onClick={() => logout()}>
            ログアウト
          </Link>
          <br/>
          <Link className="LinkContainer__username" to="/profile">{props.username}</Link>
          <Link  to="/">{props.homeTitle}</Link></div>
        ) : (
          <>
          <Link  to={props.link}>
            {props.linkTitle}
          </Link>
          <br/>
          {((cookies.name === undefined) && <Link  to="/">
            ホーム
          </Link>)}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
