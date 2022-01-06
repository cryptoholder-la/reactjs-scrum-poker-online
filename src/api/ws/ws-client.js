import {io} from 'socket.io-client';
import {wsConnection, wsError, wsException} from "../../models/ws";
import {CONNECT, ERROR, EXCEPTION} from "./events";

let ws = null;

export function getSocket(token = null) {
    if (!ws) {
        ws = io('http://localhost:9000', {
                autoConnect: Boolean(token),
                auth: {token},
            })
            .on(CONNECT, () => {
                wsConnection(ws);
            })
            .on(ERROR, (err) => {
                wsError(err);
            })
            .on(EXCEPTION, (e) => {
                wsException(e);
            });
    }
    return ws;
}
