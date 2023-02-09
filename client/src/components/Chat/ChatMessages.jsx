import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase/firebase-config";
import Message from "./Message";

const ChatMessages = () => {
    const chatRoom = useSelector((state) => state.chatRoom.roomId);
    const [messages, setMessages] = useState([]);

    const bottomRef = useRef(null);

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "messages", chatRoom), (doc) => {
                if (doc.exists() && Array.isArray(doc.data().messages)) {
                    setMessages(doc.data().messages);
                } else {
                    setMessages([]);
                }

                bottomRef.current.scrollIntoView({ behavior: "smooth" });
            });

            return () => {
                unsub();
            };
        };

        if (chatRoom) return getMessages();
    }, [chatRoom]);

    useEffect(() => {
        bottomRef.current.scrollIntoView();
    });

    return (
        <div className="w-full max-h-[592px] overflow-y-scroll hide-scrollbar pb-9">
            {messages.map((msg) => (
                <Message message={msg} key={msg.createdAt} />
            ))}

            <div ref={bottomRef} className="h-[1rem]"></div>
        </div>
    );
};

export default ChatMessages;
