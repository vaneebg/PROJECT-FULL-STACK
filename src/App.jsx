import React from 'react';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Header from './components/Header/Header';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header/>
<Routes>
  <Route path="/" element={<Home/>}/>

</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
