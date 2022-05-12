import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../Components/TodolistsList/TodolistsList";
import {Login} from "../Components/Auth/Login/Login";
import {NotFound} from "../Components/404/NotFound";

function App() {
    return (
        <Routes>
            <Route path='/' element={<TodolistsList/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='404' element={<NotFound/>}/>
            <Route path='*' element={<Navigate to='404' replace/>}/>
        </Routes>
    )
}

export default App;