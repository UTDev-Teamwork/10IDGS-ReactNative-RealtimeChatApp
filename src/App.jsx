//import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

import { Contact } from "./routes/contact";
import { Root } from "./routes/root";
import { ErrorPage } from "./error-page";
import { Login } from "./login";

export default function App() {
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  const [tab, setTab] = useState("CHATROOM");
  const [privateChats, setPrivateChats] = useState(new Map());
  const [stompClient, setStompClient] = useState();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login userData={userData} onDataChange={setUserData}/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/app",
      element: (
        <Root
          userData={userData}
          setUserData={setUserData}
          privateChats={privateChats}
          setPrivateChats={setPrivateChats}
          tab={tab}
          setTab={setTab}
          stompClient={stompClient}
          setStompClient={setStompClient}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: (
            <div className="contenido-temp">
              <img src="waiting.gif" alt="Waiting" className="img-waiting" />
            </div>
          ),
        },
        {
          path: "contacts/:receivername",
          element: (
            <Contact
              userData={userData}
              privateChats={privateChats}
              tab={tab}
              stompClient={stompClient}
              setPrivateChats={setPrivateChats}
              setUserData={setUserData}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
