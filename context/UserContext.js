"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const UserContext = createContext()


export const useUsers = () => {
    const context = useContext(UserContext)
    if (context) {
        return context
    }
}


export const UserProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false)
    const userData = []
    const setLogin = () => {
        setIsLogin(true)
    }
    useEffect(() => {
        if (Cookies.get('token')) {
            setIsLogin(true)
        }
    }, [isLogin])
    return (
        <UserContext.Provider value={{ isLogin, userData, setLogin }}>
            {children}
        </UserContext.Provider>
    )
}
