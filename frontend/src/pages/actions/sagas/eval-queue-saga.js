import {
  take,
  actionChannel,
  put,
  call,
  // select,
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
  addToConsoleHistory
  // addEvalTypeConsoleErrorHistory
} from "../../main/console/history/actions";

export function* eveluateByType(evalText, evalType = "python", chunkId) {
  // const state = yield select();
  console.log("evalType: ", evalType, " evalText: ", evalText, " chunkId: ", chunkId);
  yield put(addInputToConsole(evalText, evalType));

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"command":evalText})
  };
  const url = "/console/exec";
  const response = yield call(fetch, url, init);
  // console.log("Response: ",response.json());
  // response.json().then((data) => {
  //      yield put(
  //      addToConsoleHistory({
  //        historyType: "CONSOLE_OUTPUT",
  //        content: data,
  //        language: "python"
  //      })
  //    );
  // });
   // fetch("/console/exec", init)
   //  .then(res => res.json())
   //  .then(data => {
   //    yield put(
   //      addToConsoleHistory({
   //        historyType: "CONSOLE_OUTPUT",
   //        content: data,
   //        language: "python"
   //      })
   //    );
   //    return data;
   //  })
   //  .catch(error => {
   //    console.error("Error:", error);
   //  });
   //  console.log("result:", result);
   //  yield put(
   //    addToConsoleHistory({
   //      historyType: "CONSOLE_OUTPUT",
   //      content: result,
   //      language: "python"
   //    })
   //  );
  // yield call(evaluateLanguagePlugin, evalText);
}

export function* evaluateCurrentQueue() {
  const evalQueue = yield actionChannel("ADD_TO_EVAL_QUEUE");
  while (true) {
    try {
      const { chunk } = yield take(evalQueue);
      const { chunkContent, chunkId } = chunk;
      yield put(setKernelState("KERNEL_BUSY"));
      yield call(eveluateByType, chunkContent, chunkId);
      yield put(setKernelState("KERNEL_IDLE"));
    } catch (error) {
      yield flush(evalQueue);
      yield put(setKernelState("KERNEL_IDLE"));
    }
  }
}
