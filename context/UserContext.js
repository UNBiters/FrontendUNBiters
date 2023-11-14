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
    const [userChazas, setUserChaza] = useState([])
    const [userData, setUserData] = useState({
        chaza: false
    })
    const setLogin = (bolean) => {
        setIsLogin(bolean)
    }
    const setUser = (user) => {
        setUserData(user)
    }
    const setChazas = (chaza) => {
        setUserChaza(chaza)
    }
    useEffect(() => {
        console.log("set login true")
        if (Cookies.get('token')) {
            console.log("set login true")
            setIsLogin(true)
            if (Cookies.get('user')) {
                setUserData(JSON.parse(Cookies.get('user')))
            }
        }
    }, [isLogin])
    return (
        <UserContext.Provider value={{ isLogin, userData, userChazas, setLogin, setUser, setChazas }}>
            {children}
        </UserContext.Provider>
    )
}
