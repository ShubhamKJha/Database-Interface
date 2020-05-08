import {
  take,
  actionChannel,
  put,
  call,
  select,
  flush
} from "redux-saga/effects";

import { setKernelState } from "../eval-actions";

import {
//   languageNeedsLoading,
//   loadKnownLanguage,
  evaluateLanguagePlugin
} from "./language-plugin-saga";

import {
  addInputToConsole,
  addEvalTypeConsoleErrorHistory
} from "../../main/console/history/actions";

export function* eveluateByType(evalType, evalText, chunkId) {
  const state = yield select();

  yield put(addInputToConsole(evalText, evalType));
  yield call(evaluateLanguagePlugin, evalText);

}


export function* evaluateCurrentQueue() {
  const evalQueue = yield actionChannel("ADD_TO_EVAL_QUEUE");
  while(true) {
    try{
      const { chunk } = yield take(evalQueue);
      const { chunkType, chunkContent, chunkId } = chunk;
      yield put(setKernelState("KERNEL_BUSY"));
      yield call(eveluateByType, chunkContent, chunkId);
      yield put(setKernelState("KERNEL_IDLE"));
    } catch(error) {
      yield flush(evalQueue);
      yield put(setKernelState("KERNEL_IDLE"))
    }
  }
}
