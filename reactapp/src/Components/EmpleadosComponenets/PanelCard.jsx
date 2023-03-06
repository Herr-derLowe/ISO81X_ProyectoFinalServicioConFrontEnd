import style from "./PanelCard.module.css";
import {Link} from "react-router-dom";


export function PanelCard({to, text, img}) {
  return (
    <Link to={to} className={style.body}>
      <div className={style.picture}>
        <img src={img} />
      </div>
      <div className={style.title}>
        <span>{text}</span>
      </div>
    </Link>
  );
}
