import img from '../../../../assets/giphy (2).gif'
import './HelloAdmin.scss'


const HelloAdmin = () => {
  
  return (
    <div className="noPosts">
      <span className="noPost">Hola jefe!!</span>
      <img className="gifBoss" src={img} alt="" />
    </div>
  )
}

export default HelloAdmin