import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE } from "../config";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketHost = "http://localhost:5001";
        const newSocket = io(socketHost, {
            transports: ["websocket"],
            reconnectionAttempts: 5
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to Socket.io server:", newSocket.id);
        });

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
