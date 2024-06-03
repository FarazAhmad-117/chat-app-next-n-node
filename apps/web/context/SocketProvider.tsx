'use client'

import React, { useCallback, useContext, useEffect } from "react"

import { io } from "socket.io-client"

interface SocketProviderProps{
    children?:React.ReactNode
}

interface ISocketContext{
    sendMessage: (msg:any)=>any
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = ()=>{
    const state = useContext(SocketContext);
    if(!state) throw new Error(`State is undefined`);
    return state;
}


export const SocketProvider : React.FC<SocketProviderProps> = ({children})=>{
    const sendMessage : ISocketContext ["sendMessage"]  = useCallback((msg)=>{
        console.log(`Send message: ${msg}`);
    },[]);

    useEffect(()=>{
        const _socket = io('http://localhost:8089');

        return ()=>{
            _socket.disconnect();
        }
    },[])

    return(
        <SocketContext.Provider value={{sendMessage}} >
            {children}
        </SocketContext.Provider>
    )
}

