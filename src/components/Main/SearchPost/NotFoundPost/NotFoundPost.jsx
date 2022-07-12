import {Link} from "react-router-dom";
import './NotFoundPost.scss'

const NotFoundPost = () => {
  return (
  <div className="body"><div class="scene">
  <div className="box">
    <div className="box__face front">4</div>
    <div className="box__face back">0</div>
    <div className="box__face right">4</div>
    <div className="box__face left">0</div>
    <div className="box__face top">0</div>
    <div className="box__face bottom">0</div>
  </div>
  <div className="shadow"></div>
</div>
<div className="desc">
  <h2>Ooops post no encontrado!</h2>
</div>
   <button className="btnNot"> <Link to="/main">Volver a principal</Link></button>
    </div>
  )
}

export default NotFoundPost