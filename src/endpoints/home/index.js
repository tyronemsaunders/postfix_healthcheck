const Exception = require('../../middlewares/exception/exception');
const SuccessResponse = require('../../middlewares/response/success');
const FailureResponse = require('../../middlewares/response/failure');

const home = {

  home: {
    path: '/',
    middleware: async (ctx, next) => {
      const data = {}
      try {
        ctx.state.response = new SuccessResponse(200, 'OK', 'success', data);
        ctx.body = ctx.state.response.toObject();
        ctx.status = ctx.state.response.statusCode;
      } catch(err) {
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
  }
}

module.exports = home;
