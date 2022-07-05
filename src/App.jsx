import React from 'react';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Main from './components/Main/Main'
import ProfileDetail from './components/Main/Profile/ProfileDetail/ProfileDetail';
import PostProfileDetail from "./components/Main/Profile/ProfileDetail/PostsProfile/PostProfileDetail/PostProfileDetail";
import SearchPost from './components/Main/SearchPost/SearchPost';
import PrivateZone from "./guards/PrivateZone";
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
<Routes>
  <Route path="/" element={<Home/>}/>
<Route path="/main" element={<PrivateZone><Main/></PrivateZone>}/>
<Route path="/profile" element={<PrivateZone><ProfileDetail/></PrivateZone>}/>
<Route path="/post/:_id" element={<PrivateZone><PostProfileDetail /></PrivateZone>} />
<Route path="/search/titlePost/:postName" element={<PrivateZone><SearchPost/></PrivateZone>} />
<Route path="*" element={<NotFound />} />
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
