'use client'

import React, { useCallback, useContext, useEffect, useState } from "react"

import { io,Socket } from "socket.io-client"

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
    const [socket,setSocket] = useState<Socket>()
    const sendMessage : ISocketContext ["sendMessage"]  = useCallback((msg)=>{
        console.log(`Send message: ${msg}`);
        if(socket){
            socket.emit('event:message',{message:msg});
        }
    },[socket]);
            
    const onMessageRecieved = useCallback((msg:string)=>{
        console.log(`Recieved message: ${msg}`);
    },[])

    useEffect(()=>{
        const _socket = io('http://localhost:8089');
        _socket.on('message',onMessageRecieved)
        setSocket(_socket);

        return ()=>{
            _socket.off('message',onMessageRecieved);
            _socket.disconnect();
            setSocket(undefined);
        }
    },[])

    return(
        <SocketContext.Provider value={{sendMessage}} >
            {children}
        </SocketContext.Provider>
    )
}

