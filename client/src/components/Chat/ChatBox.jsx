import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase/firebase-config";
import Icon from "../Icon";

const ChatBox = () => {
    const inputRef = useRef(null);

    const chatRoom = useSelector((state) => state.chatRoom.roomId);
    const auth = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputRef.current.value.trim()) {
            return;
        }

        const docRef = doc(db, "messages", chatRoom);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();

        const newMessage = {
            sender: auth.email,
            message: inputRef.current.value,
            createdAt: Date.now(),
        };

        inputRef.current.value = "";

        await setDoc(doc(db, "messages", chatRoom), {
            messages: docData
                ? [...docData.messages, newMessage]
                : [newMessage],
        });
    };

    return (
        <form className="relative w-full" onSubmit={handleSubmit}>
            <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Search..."
                ref={inputRef}
            />
            <button
                type="submit"
                className="flex absolute inset-y-0 right-0 items-center pr-3"
            >
                <Icon icon="paper-plane" />
            </button>
        </form>
    );
};

export default ChatBox;
