import "./contact.css";
import { useState } from "react";

export const Contact = ({
  userData,
  privateChats,
  tab,
  stompClient,
  setPrivateChats,
  setUserData,
}) => {
  const [message, setMessage] = useState("");

  const sendPrivateValue = () => {
    console.log("Enviando mensaje privado");
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    } else {
      console.log("No hay cliente");
    }
  };

  const handleMessage = (event) => {
    console.log(event.target.value);
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  return (
    <>
      <div className="chat-body">
        <div className="chat-text">
          {[...privateChats.get(tab)].map((chat, index) => (
            <p key={index}>
              <div
                className={`message-data ${
                  (chat.senderName === userData.username &&
                    "message-data-receiver") ||
                  "message-data-sender"
                }`}
              >
                <span className="globito">{chat.message}</span>
              </div>
            </p>
          ))}
        </div>
        <div className="chat-message">
          <input type="text" value={userData.message} onChange={handleMessage} />
          <button onClick={sendPrivateValue}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/60/60525.png"
              alt="Enviar"
            />
          </button>
        </div>
      </div>
    </>
  );
};
