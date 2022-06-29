import React from 'react';
import './App.css';
import Register from "./components/Register/Register";
import { BrowserRouter,Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <BrowserRouter>
<Routes>
<Route path="/register" element={<Register />} />
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
