import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessagesNotifications } from "../../stores/slices/messagesNotification";
import { db } from "../firebase/firebase-config";

export const useMessagesNotfificatios = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const getNotifications = () => {
            const q = query(
                collection(db, "messagesNotifications"),
                where("receiver", "==", auth.email)
            );

            const unsub = onSnapshot(q, (querySnapshot) => {
                const notifications = [];
                querySnapshot.forEach((doc) => {
                    notifications.push(doc.data());
                });
                dispatch(setMessagesNotifications(notifications));
            });

            return () => {
                unsub();
            };
        };

        if (auth) {
            return getNotifications();
        }
    }, [auth]);
};
