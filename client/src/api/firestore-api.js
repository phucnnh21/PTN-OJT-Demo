import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    writeBatch,
} from "firebase/firestore";
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

export const sendNotification = async (messagesNotification) => {
    const messagesNotificationsCollectionRef = collection(
        db,
        "messagesNotifications"
    );

    await addDoc(messagesNotificationsCollectionRef, messagesNotification);
};

export const deleteNoti = async ({ sender, receiver }) => {
    var q = null;

    if (sender) {
        q = query(
            collection(db, "messagesNotifications"),
            where("receiver", "==", receiver),
            where("sender", "==", sender)
        );
    } else {
        q = query(
            collection(db, "messagesNotifications"),
            where("receiver", "==", receiver)
        );
    }

    var batch = writeBatch(db);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
};
