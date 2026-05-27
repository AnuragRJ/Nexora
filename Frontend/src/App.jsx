import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";

import AuthOverlay from "./AuthOverlay";

function App() {

  // MOBILE SIDEBAR
  const [showSidebar, setShowSidebar] = useState(false);

  // CHAT STATES
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  // CONTEXT VALUES
  const providerValues = {
    prompt,
    setPrompt,

    reply,
    setReply,

    currThreadId,
    setCurrThreadId,

    newChat,
    setNewChat,

    prevChats,
    setPrevChats,

    allThreads,
    setAllThreads
  };

  return (

    <div className='app'>

      <MyContext.Provider value={providerValues}>

        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <ChatWindow
          setShowSidebar={setShowSidebar}
        />

      </MyContext.Provider>

      {/* MOBILE OVERLAY */}
      {
        showSidebar &&
        <div
          className="overlay"
          onClick={() => setShowSidebar(false)}
        ></div>
      }

      {/* AUTH */}
      {
        !localStorage.getItem("user") &&
        <AuthOverlay />
      }

    </div>
  );
}

export default App;