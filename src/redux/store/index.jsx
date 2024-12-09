import { createStore } from "redux";
import { cartReducer } from "../reducers/cart.reduce";

export const globalStore = createStore(cartReducer)