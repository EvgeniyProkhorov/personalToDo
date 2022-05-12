import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../Components/TodolistsList/TodolistsList";
import {Login} from "../Components/Auth/Login/Login";

function App() {
    return (
        <Routes>
            <Route path='/' element={<TodolistsList/>}/>
            <Route path='login' element={<Login/>}/>
        </Routes>
    )
}
export default App;