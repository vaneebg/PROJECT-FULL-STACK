import img from '../../../assets/giphy.gif'

import './NotPublicPost.scss'

const NotPublicPost = () => {
  return (
    <div className="noPosts">
    <span className="noPost">No has publicado nada aún...</span>
    <img className="gifno" src={img} alt="" />
    </div>
  )
}

export default NotPublicPost