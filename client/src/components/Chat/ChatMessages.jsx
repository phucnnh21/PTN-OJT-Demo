import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase/firebase-config";
import { groupBy } from "../../utils/helpers";
import Message from "./Message";

const ChatMessages = () => {
    const chatRoom = useSelector((state) => state.chatRoom.roomId);
    const [messages, setMessages] = useState([]);
    const [messagesMapped, setMessagesMapped] = useState({});

    const bottomRef = useRef(null);

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "messages", chatRoom), (doc) => {
                if (doc.exists() && Array.isArray(doc.data().messages)) {
                    const res = groupBy(doc.data().messages, (msg) =>
                        moment(msg.createdAt).format("MMMM Do YYYY")
                    );

                    setMessagesMapped(res);
                    setMessages(doc.data().messages);
                } else {
                    setMessages([]);
                }
            });

            return () => {
                unsub();
            };
        };

        if (chatRoom) return getMessages();
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chatRoom]);

    useEffect(() => {
        bottomRef.current.scrollIntoView();
    });

    return (
        <div className="w-full max-h-[592px] overflow-y-scroll hide-scrollbar pb-9">
            {Object.keys(messagesMapped).map((key) => (
                <React.Fragment key={`key-group-${key}`}>
                    <div className="inline-flex items-center justify-center w-full relative">
                        <hr className="w-96 h-px my-8 bg-gray-200 border-0" />
                        <span className="absolute bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            {key}
                        </span>
                    </div>
                    <>
                        {messagesMapped[key].map((msg) => (
                            <Message message={msg} key={msg.createdAt} />
                        ))}
                    </>
                </React.Fragment>
            ))}

            <div ref={bottomRef} className="h-[1rem]"></div>
        </div>
    );
};

export default ChatMessages;
