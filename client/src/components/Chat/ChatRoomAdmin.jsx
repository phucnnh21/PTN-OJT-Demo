import React, { useEffect, useState } from "react";
import { filterApi } from "../../api/users-api";
import ChatBox from "./ChatBox";
import ChatMessages from "./ChatMessages";

import { useDispatch, useSelector } from "react-redux";
import { setChatRoomAsync } from "../../stores/slices/chatRoomSlice";
import ChatSearchUser from "./ChatSearchUser";
import Badge from "../Icon/Badge";
import { deleteNoti, loadChatRoom } from "../../api/firestore-api";

const ChatRoomAdmin = () => {
    const auth = useSelector((state) => state.auth);
    const chatRoom = useSelector((state) => state.chatRoom);
    const messagesNotifications = useSelector(
        (state) => state.messagesNotifications
    );
    const dispatch = useDispatch();

    // Data to fill in the table
    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);
    const [userFilter, setUserFilter] = useState({
        page: 1,
        size: 2147483647,
        keyword: "",
        role: "",
        total: 0,
        orderBy: {
            fieldName: "",
            isAscending: false,
        },
    });

    useEffect(() => {
        if (userFilter.keyword) {
            filterApi(userFilter)
                .then((res) => {
                    setTableData(
                        res.payload.filter((item) => item.id != auth.id)
                    );
                    if (total != res.total) {
                        setTotal(res.total);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            loadChatRoom(auth).then((res) => {
                setTableData(res);
                if (total != res.length) {
                    setTotal(res.length);
                }
            });
        }
    }, [userFilter]);

    const showNumberOfNoti = (user) => {
        const numberOfRoomNoti = messagesNotifications.filter(
            (noti) => noti.sender == user.email
        ).length;

        if (numberOfRoomNoti)
            return (
                <Badge
                    content={numberOfRoomNoti}
                    className="absolute right-[1px] bottom-[50%] translate-y-1/2"
                />
            );
    };

    return (
        <div className="w-full h-screen flex bg-white flex-row">
            <div className="h-screen w-1/4 border-r relative pt-32 md:pt-20">
                <ChatSearchUser
                    userFilter={userFilter}
                    setUserFilter={setUserFilter}
                />
                <div className="h-full overflow-y-scroll hide-scrollbar">
                    {tableData.map((user) => (
                        <div
                            key={user.id}
                            className={`relative flex flex-row justify-between border-y p-4 cursor-pointer w-full overflow-x-scroll hide-scrollbar ${
                                chatRoom?.userEmail === user.email
                                    ? "bg-blue-200 hover:bg-blue-200"
                                    : "hover:bg-blue-50"
                            }`}
                            onClick={async () => {
                                dispatch(
                                    setChatRoomAsync({
                                        user1: auth,
                                        user2: user,
                                        userEmail: user.email,
                                    })
                                );

                                deleteNoti({
                                    sender: user.email,
                                    receiver: auth.email,
                                });
                            }}
                        >
                            <span>{user.email}</span>
                            {showNumberOfNoti(user)}
                        </div>
                    ))}
                </div>
            </div>
            {chatRoom && (
                <div
                    className="h-screen w-3/4 flex flex-col justify-between bg-gray-100 p-6"
                    onClick={() => {
                        deleteNoti({
                            sender: chatRoom.userEmail,
                            receiver: auth.email,
                        });
                    }}
                >
                    <div className="w-full">
                        <h3 className="font-bold text-lg mb-4">
                            Chat with {chatRoom.userEmail}
                        </h3>
                        <ChatMessages />
                    </div>
                    <div className="w-full">
                        <ChatBox />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRoomAdmin;
