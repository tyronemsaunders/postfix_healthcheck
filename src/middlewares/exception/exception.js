const Exception = class extends Error {
	constructor(statusCode, status, message) {
		
		// call parent class constructor
		super(message);
		this._statusCode = statusCode;
		this.status = status;
	}
	
	get statusCode() {
		return this._statusCode;
	}
	
	toObject() {
		return {
			status: this.status,
			code: this._statusCode,
			message: this.message
		}
	}
}

module.exports = Exception;