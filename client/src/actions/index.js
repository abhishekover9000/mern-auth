"use_strict";
import axios from "axios";
import { FETCH_USER, CREATE_LOCAL_USER, LOGIN_LOCAL } from "./types";

export const fetchUser = () => async dispatch => {
	const userData = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: userData });
};

export const createLocalUser = user => async dispatch => {
	const userData = await axios.post("/auth/register", user);

	dispatch({
		type: CREATE_LOCAL_USER,
		payload: userData
	});
};

export const loginLocal = user => async dispatch => {
	const userData = await axios.post("/auth/login", user);

	dispatch({
		type: LOGIN_LOCAL,
		payload: userData
	});
};
