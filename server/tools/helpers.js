/**
 *
 * refactored by ahaloua :)
 */

function isEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function isName(name) {
	const re = /^[a-zA-Z]{3,24}$/;
	return re.test(String(name));
}

function isPassword(password) {
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
	return re.test(String(password));
}

function isUsername(username) {
	const re = /^[a-zA-Z0-9-]{3,24}$/;
	return re.test(String(username));
}

function isNumber(value) {
	// angular implementation
	// Infinity -Infinity = NaN :)
	return !isNaN(value - parseFloat(value));
}

module.exports = {
	isEmail,
	isName,
	isPassword,
	isUsername,
	isNumber,
};
