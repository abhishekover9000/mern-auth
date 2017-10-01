import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
	console.log(action);
	switch (action.type) {
		case FETCH_USER:
			return (
				action.payload.data.googleID ||
				action.payload.data.facebookID ||
				false
			);
		default:
			return state;
	}
}
