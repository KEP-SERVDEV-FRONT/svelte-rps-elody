import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import { bind } from "svelte3-redux";
import { reducer } from "./reducer";

export const store = createStore(reducer, composeWithDevTools());
export const state = bind(store);
