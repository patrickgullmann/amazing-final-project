import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        console.log("Connection hello 🐧 ");
        socket = io.connect();

        // socket.on("some-messages", (data) => {
        //     store.dispatch(smth(data));
        // });
    }
};
