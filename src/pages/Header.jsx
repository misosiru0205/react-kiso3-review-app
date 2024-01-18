import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Header(props) {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  function logout() {
    removeCookie("token");
    setCookie("log", false);
  }
  return (
    <header>
      <p>書籍レビューApp</p>
      <div className="titlecontainer">
        <Link className="link" to={props.link}>
          {props.linkTitle}
        </Link>
        <br />
        {cookies.token && (
          <div>
            <Link to="/login" onClick={() => logout()}>
              ログアウト
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
