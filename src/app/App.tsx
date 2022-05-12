import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../Components/TodolistsList/TodolistsList";
import {Login} from "../Components/Auth/Login/Login";
import {NotFound} from "../Components/404/NotFound";

function App() {
    return (
        <Routes>
            <Route path='/' element={<TodolistsList/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}

export default App;