import { useState, useEffect,  } from "react";
import { Outlet, Link } from "react-router-dom";
import "./root.css";
import { ChatList } from "../components/chat-list";

import { over } from "stompjs";
import * as SockJS from 'sockjs-client';

export const Root = ({userData, setUserData, privateChats, setPrivateChats, tab, setTab, stompClient, setStompClient}) => {

  useEffect(() => {
    conectar();
  }, []);

  const conectar = () => {
    console.log("Intentando conectar");
    let socket = new SockJS("http://localhost:7373/ws");
    setStompClient(over(socket));
    setTimeout(() => {
      stompClient.connect({}, conectado, console.log("Error de conexión"));
    }, 2000);
    
  };

  const conectado = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    iniciarUsuario();
  };

  const iniciarUsuario = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));

    console.log("CONECTADO Y LISTO");
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  return (
    <>
      <div className="body">
        <div className="sideBar">
          <div className="sb-m sideBar-title">
            <h1>Chats</h1>
          </div>
          <div className="sb-m sideBar-content">
            {<ChatList tab={tab} setTab={setTab} myname={userData.username} privateChats={privateChats} />}
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
