import React, { useEffect, useState } from "react";
import { filterApi } from "../../api/users-api";
import ChatBox from "./ChatBox";
import ChatMessages from "./ChatMessages";

import { useDispatch, useSelector } from "react-redux";
import { handleAccessChatRoom } from "../../api/firestore-api";
import { setChatRoom } from "../../stores/slices/chatRoomSlice";
import ChatSearchUser from "./ChatSearchUser";

const ChatRoomAdmin = () => {
    const auth = useSelector((state) => state.auth);
    const chatRoom = useSelector((state) => state.chatRoom);
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
        filterApi(userFilter)
            .then((res) => {
                setTableData(res.payload.filter((item) => item.id != auth.id));
                if (total != res.total) {
                    setTotal(res.total);
                }
            })
            .catch((err) => console.log(err));
    }, [userFilter]);

    return (
        <div className="w-full h-screen flex bg-white flex-row">
            <div className="h-screen w-1/4 border-r relative pt-[5rem]">
                <ChatSearchUser
                    userFilter={userFilter}
                    setUserFilter={setUserFilter}
                />
                <div className="h-full overflow-y-scroll hide-scrollbar">
                    {tableData.map((user) => (
                        <div
                            key={user.id}
                            className="border-y p-4 cursor-pointer w-full overflow-x-scroll hide-scrollbar"
                            onClick={async () => {
                                dispatch(
                                    setChatRoom({
                                        roomId: await handleAccessChatRoom(
                                            auth,
                                            user
                                        ),
                                        userEmail: user.email,
                                    })
                                );
                            }}
                        >
                            {user.email}
                        </div>
                    ))}
                </div>
            </div>
            {chatRoom && (
                <div className="h-screen w-3/4 flex flex-col justify-between bg-gray-100 p-6">
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
