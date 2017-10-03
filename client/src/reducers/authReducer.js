import { FETCH_USER, LOGIN_LOCAL } from "../actions/types";

export default function(state = null, action) {
	console.log(action);
	switch (action.type) {
		case FETCH_USER:
			return (
				action.payload.data.googleID ||
				action.payload.data.facebookID ||
				action.payload.data._id ||
				false
			);
		case LOGIN_LOCAL:
			return state;
		default:
			return state;
	}
}
