import img from '../../../../../../assets/giphy (1).gif'

const NotFav = () => {
  return (
    <div className="noPosts">
      <span className="noPost">No le has dado like a ningún post...</span>
      <img className="gifno" src={img} alt="" />
    </div>
  )
}

export default NotFav