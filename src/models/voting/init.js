import {sample} from "effector";
import {$wsState} from "../ws";
import {
    sendScore,
    sendScoreFx,
    showResults,
    showResultsFx,
    startVoting,
    startVotingFx,
    stopVoting,
    stopVotingFx
} from "./index";
import {
    DISPATCH_RESULTS,
    SCORE_DISPATCH,
    SEND_SCORE,
    SHOW_RESULTS,
    VOTING_FINISH,
    VOTING_FINISHED,
    VOTING_START,
    VOTING_STARTED,
} from "../../api/ws/events";
import {$room} from "../room";

startVotingFx.use(({ws, roomId}) => {
    ws?.once(VOTING_STARTED, (payload) => {
        console.log('--- VOTING_STARTED ---', payload);
    }).emit(VOTING_START, {roomId});
});

stopVotingFx.use(({ws, roomId}) => {
    ws?.once(VOTING_FINISHED, (payload) => {
        console.log('--- VOTING_FINISHED ---', payload);
    }).emit(VOTING_FINISH, {roomId});
});

sendScoreFx.use(({ws, roomId, score}) => {
    ws?.once(SCORE_DISPATCH, (score) => {
        console.log('--- SCORE_DISPATCH ---', score);
    }).emit(SEND_SCORE, {roomId, score});
});

showResultsFx.use(({ws, roomId}) => {
    ws?.once(DISPATCH_RESULTS, (results) => {
        console.log('--- DISPATCH_RESULTS ---', results);
    }).emit(SHOW_RESULTS, {roomId});
});

// $voting.on(startVotingFx, (_, votingState) => votingState);

sample({
    source: {$wsState, $room},
    clock: startVoting,
    fn: ({$wsState, $room}) => ({ws: $wsState.ws, roomId: $room.uid}),
    target: startVotingFx,
});

sample({
    source: {$wsState, $room},
    clock: stopVoting,
    fn: ({$wsState, $room}) => ({ws: $wsState.ws, roomId: $room.uid}),
    target: stopVotingFx,
});

sample({
    source: {$wsState, $room},
    clock: sendScore,
    fn: ({$wsState, $room}, score) => ({ws: $wsState.ws, roomId: $room.uid, score}),
    target: sendScoreFx,
});

sample({
    source: {$wsState, $room},
    clock: showResults,
    fn: ({$wsState, $room}) => ({ws: $wsState.ws, roomId: $room.uid}),
    target: showResultsFx,
});
