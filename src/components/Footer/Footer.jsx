import { TwitterOutlined, GithubOutlined, LinkedinOutlined, SkypeOutlined } from "@ant-design/icons";
import './Footer.scss'



const Footer = () => {
  return (<div className='footer'>
    <span>Vanesa B Julio 2022 © </span>
    <div className="social">
    <a href="https://www.linkedin.com/in/vanesa-b-a59b6a230/"><LinkedinOutlined className='svg' /></a>
    <a href="https://github.com/vaneebg"><GithubOutlined className='svg' /></a>
  </div>
  </div>
  )
}

export default Footer