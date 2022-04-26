import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat.js";

// front-end connected with backend using socket.io-client package
const socket = io.connect("http://localhost:3001");

function App() {
  // user details for joining chat room
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  // for redirecting to chatroom
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      // front end emitting events to be listened on backend
      // confirming the room id and redirecting to chat room
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    // rendering chat only after taking room details
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text" required
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text" required
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;


