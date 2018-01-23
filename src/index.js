const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const exception_handler = require('./middlewares/exception');
const FailureResponse = require('./middlewares/response/failure');

const app = new Koa();

app.use(bodyParser()); // parse requests sent by the user
app.use(logger());
app.use(json()); // JSON pretty-printed response middleware
app.use(compress()); //compress/gzip
app.use(helmet());
app.use(cors({
	origin: '*',
	allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	allowHeaders: ['Content-Type', 'Accept']
}));

// Middleware - Exceptions
app.use(exception_handler);

// return the router object
const router = require('./endpoints')();

// Middleware - Load Routes
app.use(router.routes());
app.use(router.allowedMethods());

// 404 response if route not found
app.use((ctx) => {
	if (ctx.status === 404) {
		ctx.state.response = new FailureResponse(404, 'Not Found', 'fail', {});
		ctx.body = ctx.state.response.toObject();
		ctx.status = ctx.state.response.statusCode;
	}
});

// start the application
async function start() {
	try {
		// launch the app
		await app.listen(3333); //http.createServer(app.callback()).listen(3333);
		console.log('koa listening on port 3333');
	} catch (error) {
		throw error;
	}
}

try {
	start();
} catch (error) {
	console.error(error);
}
