
import img1 from '../../../assets/carrousel1.jpg'
import img2 from '../../../assets/carrousel2.jpg'
import img3 from '../../../assets/carrousel3.jpg'
import img4 from '../../../assets/carrousel4.jpg'
import img5 from '../../../assets/carrousel5.jpg'
import { Carousel } from 'antd';
import './Carrousel.scss'


const Carrousel = () => {

  return (
    <div className='carrousel'>
      <Carousel autoplay>
        <div>
          <img src={img1} alt='' />
        </div>
        <div>
          <img src={img2} alt='' />
        </div>
        <div>
          <img src={img3} alt='' />
        </div>
        <div>
          <img src={img4} alt='' />
        </div>
        <div>
          <img src={img5} alt='' />
        </div>
      </Carousel>
    </div>
  )
}

export default Carrousel