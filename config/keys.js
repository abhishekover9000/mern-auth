// keys.js

const devKeys = require("dev.js");

if (process.env.NODE_ENV === "production") {
	module.exports = require("./prod");
} else {
	module.exports = require("./dev");
}
