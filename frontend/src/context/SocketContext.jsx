import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE } from "../config";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Use API_BASE from central config instead of hardcoded string
        const newSocket = io(API_BASE, {
            transports: ["websocket"],
            reconnectionAttempts: 5,
            timeout: 10000,
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("🟢 [Socket] Connected:", newSocket.id);
        });

        newSocket.on("connect_error", (err) => {
            console.error("🔴 [Socket] Connection Error:", err.message);
        });

        // Cleanup: Use disconnect() which is the standard socket.io method.
        // Note: In React Strict Mode (Dev), this will trigger a browser warning
        // "WebSocket is closed before connection is established" because React
        // mounts/unmounts fast. This is harmless but expected.
        return () => {
            if (newSocket) newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
