import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {

    const {
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setPrevChats,
        setNewChat
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {

        if(!prompt.trim()) return;

        setLoading(true);
        setNewChat(false);

        console.log(
            "message ",
            prompt,
            " threadId ",
            currThreadId
        );

        const options = {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                threadId: currThreadId,

                message: prompt,

                userId:
                JSON.parse(localStorage.getItem("user"))._id

            })
        };

        try {

         const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
    options
);

            const res = await response.json();

            console.log(res);

            setReply(res.reply);

        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    // Append new chat to prevChats
    useEffect(() => {

        if (prompt && reply) {

            setPrevChats(prevChats => (
                [
                    ...prevChats,

                    {
                        role: "user",
                        content: prompt
                    },

                    {
                        role: "assistant",
                        content: reply
                    }
                ]
            ));
        }

        setPrompt("");

    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    };

    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("user");

        window.location.reload();
    };

    return (

        <div className="chatWindow">

            <div className="navbar">

                <span>
                    Nexora 
                    <i className="fa-solid fa-chevron-down"></i>
                </span>

                <div
                    className="userIconDiv"
                    onClick={handleProfileClick}
                >

                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>

                </div>

            </div>

            {

                isOpen &&

                <div className="dropDown">

                    <div className="dropDownItem">
                        <i className="fa-solid fa-gear"></i>
                        Settings
                    </div>

                    <div className="dropDownItem">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        Upgrade plan
                    </div>

                    <div
                        className="dropDownItem"
                        onClick={handleLogout}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Log out
                    </div>

                </div>
            }

            <Chat />

            <ScaleLoader
                color="#fff"
                loading={loading}
            />

            <div className="chatInput">

                <div className="inputBox">

                    <input

                        disabled={!localStorage.getItem("user")}

                        placeholder="Ask anything"

                        value={prompt}

                        onChange={(e) =>
                            setPrompt(e.target.value)
                        }

                        onKeyDown={(e) =>
                            e.key === "Enter"
                            ? getReply()
                            : ""
                        }
                    />

                    <div
                        id="submit"
                        onClick={getReply}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>

                </div>

                <p className="info">

                    Nexora can make mistakes.
                    Check important info.

                </p>

            </div>

        </div>
    );
}

export default ChatWindow;