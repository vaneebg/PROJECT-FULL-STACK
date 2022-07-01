import React from 'react';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Main from './components/Main/Main'
import ProfileDetail from './components/Main/Profile/ProfileDetail/ProfileDetail';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
<Routes>
  <Route path="/" element={<Home/>}/>
<Route path="/main" element={<Main/>}/>
<Route path="/profile" element={<ProfileDetail/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
