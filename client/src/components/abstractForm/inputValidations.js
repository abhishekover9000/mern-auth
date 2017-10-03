import Constants from "./inputValidationConstants";

const compareLength = (type, compare, value) => {
	switch (type) {
		case Constants.GREATER_THAN:
			return value.length > compare;
		case Constants.LESS_THAN:
			return value.length < compare;
		case "GEQ":
			return value.length >= compare;
		case "LEQ":
			return value.length <= compare;
		case "EQ":
			return value.length === compare;
		default:
			return false;
	}
};

const checkRegex = (type, value, regex = null) => {
	switch (type) {
		case "EMAIL":
			const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			return emailRegex.test(value);
		case "PHONE_USA":
			const phoneUSARegex = null;
			break;
		case "ALL_NUMBERS":
			break;
		case "ALL_ALPHANUMERIC":
			break;
		case "NO_SPECIAL_CHARACTERS":
			break;
		case "CUSTOMREGEX":
			// only case where regex is not null
			break;
		default:
			return false;
			break;
	}
};

const checkMatch = (val1, val2) => {
	return val1 === val2;
};

const parseConstraint = (check, type, compare, value) => {
	switch (check) {
		case "length":
			return compareLength(type, compare, value);
			break;
		case "regex":
			return checkRegex(type, compare, value);
			break;
		case "match":
			return checkMatch(type, compare, value);
		default:
			return false;
			break;
	}
};

const showMsg = (ref, message, color) => {
	ref.innerHTML = message;
	ref.style.color = color;
};

const hideMsg = ref => {
	ref.innerHTML = "";
};

export default {
	showMsg,
	hideMsg,
	parseConstraint,
	checkRegex,
	compareLength,
	checkMatch
};
