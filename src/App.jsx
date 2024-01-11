import "./App.scss";
import  Header  from "./Header";

export default function App() {

  const title = "書籍レビューApp";

  return (
    <>
    <Header title={title}/>
    <a href="http://localhost:3000/signup">サインアップ</a>
    </>
  );
}

