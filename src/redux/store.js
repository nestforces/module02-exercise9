import { configureStore } from "@reduxjs/toolkit";
import cardReducers from "./reducers";

export const store = configureStore({
	reducer: {
		product: cardReducers,
	}
})

