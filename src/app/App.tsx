import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../Components/TodolistsList/TodolistsList";
import {Login} from "../Components/Auth/Login/Login";
import {NotFound} from "../Components/404/NotFound";
import {useDispatch} from "react-redux";
import {initializedAppTC} from "../Redux/reducers/appReducer/app-reducer";
import {useAppSelector} from "../Redux/store/store";

function App() {
    const dispatch = useDispatch()
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

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