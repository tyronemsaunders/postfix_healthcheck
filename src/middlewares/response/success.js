const Exception = require('../../middlewares/exception/exception');

const SuccessResponse = class {
	constructor(statusCode, message, status = 'success', data = {}) {
		this._statusCode = statusCode;
		this.message = message;

		if (status == 'success') {
			this.status = status;
		} else {
			throw new Exception(500, 'error', 'There was a problem building a response');
		}

		if (typeof data === 'object') {
			this.data = data;
		} else {
			throw new Exception(500, 'error', 'There was a problem building a response');
		}

	}

	get statusCode() {
		return this._statusCode;
	}

	toObject() {
		return {
			status: this.status,
			code: this._statusCode,
			message: this.message,
			data: this.data
		}
	}
}

module.exports = SuccessResponse;
