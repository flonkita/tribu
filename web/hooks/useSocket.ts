"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL as string, {
      transports: ["websocket"],
    });

    // L'état ne se met à jour qu'une fois la connexion établie (asynchrone)
    socketInstance.on("connect", () => {
      setSocket(socketInstance);
    });

    // Écoute des nouveaux commentaires en direct
    socketInstance.on("newAnswer", (nouvelleReponse) => {
      console.log("🔥 Nouvelle réponse reçue en direct :", nouvelleReponse);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
