import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const auth = useSelector((state) => state.auth);

    if (auth.email == message.sender) {
        return (
            <div className="w-full flex flex-row justify-end py-1">
                <div className="flex flex-col items-end">
                    <div
                        className="text-gray-500"
                        style={{
                            opacity: 0.8,
                            fontSize: 12,
                        }}
                    >
                        {moment(message.createdAt).format("HH:mm")}
                    </div>
                    <div className="p-2 bg-blue-300 rounded">
                        {message.message}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-row justify-start py-1">
            <div className="flex flex-col items-start">
                <div
                    className="text-gray-500"
                    style={{
                        opacity: 0.8,
                        fontSize: 12,
                    }}
                >
                    {moment(message.createdAt).format("HH:mm")}
                </div>
                <div className="p-2 bg-gray-300 rounded">{message.message}</div>
            </div>
        </div>
    );
};

export default Message;
