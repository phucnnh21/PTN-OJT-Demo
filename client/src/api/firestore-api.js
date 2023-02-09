import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase/firebase-config";

export const handleAccessChatRoom = async (user1, user2) => {
    const chatRoomsCollectionRef = collection(db, "chatRooms");

    const checkExistQuery = query(
        chatRoomsCollectionRef,
        where(`members.${user1.id}`, "==", user1.email),
        where(`members.${user2.id}`, "==", user2.email)
    );

    const querySnapshot = await getDocs(checkExistQuery);

    if (querySnapshot.docs.length == 0) {
        var newChatRoomMembers = {};
        newChatRoomMembers[user1.id] = user1.email;
        newChatRoomMembers[user2.id] = user2.email;

        const createChatRoom = await addDoc(chatRoomsCollectionRef, {
            members: newChatRoomMembers,
        });

        return createChatRoom.id;
    } else {
        return querySnapshot.docs[0].id;
    }
};
