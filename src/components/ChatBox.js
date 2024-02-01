import React, { useState, useEffect } from "react";
import { Button, Card, Flex, Input } from "antd";

import socketIOClient from "socket.io-client";

let ENDPOINT = "http://127.0.0.1:3030";
let socket;

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket = socketIOClient(`${ENDPOINT}`);
    socket.on("message", (message) => {
      console.log("socket received", message);
      setMessages([...messages, message.data]);
    });
  }, [messages]);

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  function onSubmit() {
    setMessages([...messages, input]);
    socket.emit("message", { message: input });
  }
  return (
    <div>
      <Card
        title="user name"
        style={{ width: "300px" }}
        bodyStyle={{ margin: "0px", padding: "0px" }}
      >
        {messages.map((x, i) => (
          <p key={x + i} style={{ padding: "4px" }}>
            {x}
          </p>
        ))}
        <Flex
          justify="center"
          align="center"
          style={{ margin: "0px", padding: "0px" }}
        >
          <Input onChange={(v) => setInput(v.target.value)}></Input>
          <Button onClick={onSubmit}>submit</Button>
        </Flex>
      </Card>
    </div>
  );
}
