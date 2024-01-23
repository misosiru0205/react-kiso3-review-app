import { useDispatch } from "react-redux";
import { increment, decrement } from "../pagesSlice";
import "./PageNation.scss";

function PageNation(props) {
  const dispatch = useDispatch();

  return (
    <div className="PagiNation">
      <p className="PagiNation__count">ページ:{props.count + 1}</p>
      <div className="PagiNation__button">
        {props.count !== 0 && (
          <input
            type="button"
            value="前ページ"
            onClick={() => dispatch(decrement())}
          />
        )}
        {props.length >= 10 && (
          <input
            type="button"
            value="次ページ"
            onClick={() => dispatch(increment())}
          />
        )}
      </div>
    </div>
  );
}

export default PageNation;
