const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const health = require('./health');

module.exports = function endpoints() {

	//Middleware
	router.use(async (ctx, next) => {
		if (ctx.request.method == 'OPTIONS') {
			// don't do anything else
			ctx.response.status = 200;
		} else {
			// go to the next middleware
			return next();
		}
	});

	/**
	 * Routes that do not need authentication or authorization
	 */
	router.get(home.home.path, home.home.middleware);
	router.get(health.healthcheck.path, health.healthcheck.middleware);

	return router;
}
