
import img1 from '../../../assets/carrousel1.webp'
import img2 from '../../../assets/carrousel2.webp'
import img3 from '../../../assets/carrousel3.jpg'
import img4 from '../../../assets/carrousel4.webp'
import img5 from '../../../assets/carrousel5.webp'

import './Carrousel.scss'
import { Carousel } from 'antd';




const Carrousel = () => {
  // const contentStyle = {
  //   height: '40em',
  //   color: '#fff',
  //   lineHeight: '160px',
  //   textAlign: 'center',
  //   background: '#364d79',
  // };



  return (
    <div className='carrousel'>
        <Carousel autoplay>
    <div>
  
    <img src={img1} alt=''/>
    </div>
    <div>
      <img src={img2} alt=''/>
    </div>
    <div>
      <img src={img3} alt=''/>
    </div>
    <div>
     <img src={img4} alt=''/>
    </div>
    <div>
      <img src={img5} alt=''/>
    </div>
  </Carousel>
    </div>
  )
}

export default Carrousel