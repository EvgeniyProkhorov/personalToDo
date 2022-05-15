import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../Components/TodolistsList/TodolistsList";
import {Login} from "../Components/Auth/Login/Login";
import {NotFound} from "../Components/404/NotFound";
import {useDispatch} from "react-redux";
import {initializedAppTC, RequestStatusType} from "../Redux/reducers/appReducer/app-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import {useAppSelector} from "../Redux/store/store";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {logoutTC} from "../Redux/reducers/authReducer/auth-reducer";

function App() {
    const dispatch = useDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {'To-do List'}
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Routes>
                <Route path='/' element={<TodolistsList/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='404' element={<NotFound/>}/>
                <Route path='*' element={<Navigate to='404' replace/>}/>
            </Routes>
        </div>
    )
}

export default App;