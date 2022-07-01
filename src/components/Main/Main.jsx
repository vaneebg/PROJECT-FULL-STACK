import React from 'react'
import Profile from './Profile/Profile'
import Posts from './Posts/Posts'
import ModalAddPost from './ModalAddPost/ModalAddPost'
import './Main.scss'


const Main = () => {
  return (<div className='main'>
    
    <Posts/>
    <Profile/>
    <ModalAddPost/>
    </div>
  )
}

export default Main