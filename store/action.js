import { state, store } from "./store";
import {
  MY_SELECTED_ANSWER,
  COMPUTER_ANSWER_SHUFFLE,
  RESET_MY_ANSWER,
  RESET_COMPUTER_ANSWER,
  RESET_RESULT,
  GAME_DRAW,
  GAME_LOSE,
  GAME_WIN,
} from "./config";

// 나의 답이 선택됐을때
export const selectMyAnswer = (value) => {
  state.dispatch({ type: MY_SELECTED_ANSWER, value });
};

// 컴퓨터의 답을 섞을때
export const computerAnswerShuffle = () => {
  state.dispatch({ type: COMPUTER_ANSWER_SHUFFLE });
};

// 게임 초기화할때
export const gameReset = () => {
  state.dispatch({ type: RESET_MY_ANSWER });

  state.dispatch({ type: RESET_COMPUTER_ANSWER });

  state.dispatch({ type: RESET_RESULT });
};

// 게임결과 계산할때
export const winLossCalculation = () => {
  const myAnswer = store.getState().my.answer;
  const computerAnswer = store.getState().computer.answer;

  if (myAnswer === computerAnswer) {
    state.dispatch({ type: GAME_DRAW });
  } else if ((myAnswer % 3) + 1 === computerAnswer) {
    state.dispatch({ type: GAME_LOSE });
  } else {
    state.dispatch({ type: GAME_WIN });
  }
};
