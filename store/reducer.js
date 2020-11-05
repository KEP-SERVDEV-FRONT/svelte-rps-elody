import { initialState } from "./state";
import { combineReducers } from "redux";
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

// 나의 답을 바꾸는경우
const my = (state = initialState.my, action) => {
  switch (action.type) {
    case MY_SELECTED_ANSWER:
      return { ...state, answer: action.value };

    case RESET_MY_ANSWER:
      return { ...state, answer: 1 };

    default:
      return state;
  }
};

// 컴퓨터의 답을 바꾸는경우
const computer = (state = initialState.computer, action) => {
  switch (action.type) {
    case COMPUTER_ANSWER_SHUFFLE:
      return { ...state, answer: parseInt(Math.random() * 3) + 1 };

    case RESET_COMPUTER_ANSWER:
      return { ...state, answer: 1 };

    default:
      return state;
  }
};

// 게임 결과를 바꾸는경우
const result = (state = initialState.result, action) => {
  switch (action.type) {
    case GAME_DRAW:
      return { emoji: "🙌🏻", message: "비겼어요" };

    case GAME_LOSE:
      return { emoji: "👻", message: "졌어요" };

    case GAME_WIN:
      return { emoji: "🤟🏻", message: "이겼어요" };

    case RESET_RESULT:
      return null;

    default:
      return state;
  }
};

export const reducer = combineReducers({
  my,
  computer,
  result,
});
