const Exception = require('./exception');

const exception = async function(ctx, next) {
	try {
		return next();
	} catch (err) {
		if (err instanceof Exception) {
			ctx.body = err.toObject();
			ctx.status = err.statusCode;
		} else {
			const error = new Exception(500, 'error', 'Unexpected Error');
			ctx.body = error.toObject();
			ctx.status = error.statusCode;
		}
	}
}

module.exports = exception;
