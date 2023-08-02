import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("https://chat-app-backend-xb71.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const sendmessage = (e) => {
    e.preventDefault();
    socket.emit("chat", { username, message });
    setMessage("");
  };

  return (
    <>
      <h1>JUST CHAT</h1>
      <div className="app">
        <div className="chat-window">
          <div className="chat">
            {messages.map((msg, idx) => (
              <div>
                {msg.username === username ? (
                  <div className="outgoing">
                    <p key={idx}>
                      {username} : {msg.message}
                    </p>
                  </div>
                ) : (
                  <div className="incoming">
                    <p key={idx} >
                      {msg.username} : {msg.message}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <form onSubmit={sendmessage}>
            <input
              type="text"
              placeholder="Enter user name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
