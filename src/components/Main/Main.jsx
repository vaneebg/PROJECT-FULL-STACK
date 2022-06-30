import React from 'react'
import Profile from './Profile/Profile'
import Posts from './Posts/Posts'
import './Main.scss'

const Main = () => {
  return (<div className='main'>
    
    <Posts/>
    <Profile/>
    </div>
  )
}

export default Main