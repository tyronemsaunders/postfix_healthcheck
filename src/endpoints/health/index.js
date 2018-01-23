const { exec } = require('child_process');
const net = require('net');

const Exception = require('../../middlewares/exception/exception');
const SuccessResponse = require('../../middlewares/response/success');
const FailureResponse = require('../../middlewares/response/failure');

const health = {

  healthcheck: {
    path: '/health',
    middleware: async (ctx, next) => {
      const data = {}

      async function postfix_status() {
        return new Promise((resolve, reject) => {
          exec('service postfix status', (err, stdout, stderr) => {
            if (err) {
              ctx.state.response = new SuccessResponse(200, 'Postfix is not running', 'success', data);
              resolve(ctx.state.response);
            } else {
              // check for a TCP connection
              const socket = net.createConnection(25, 'localhost', () => {

                socket.destroy();
                // everything is OK and postfix is running an listening on port 25
                ctx.state.response = new SuccessResponse(200, 'OK', 'success', data);
                resolve(ctx.state.response);
              });

              socket.on('error', (err) => {
                socket.destroy();
                ctx.state.response = new SuccessResponse(200, 'Error connecting to Postfix', 'success', data);
                resolve(ctx.state.response);
              });

              socket.on('timeout', () => {
                socket.destroy();
                ctx.state.response = new SuccessResponse(200, 'Postfix socket timeout', 'success', data);
                resolve(ctx.state.response);
              });
            }
          });
        });
      }

      try {
        const response = await postfix_status();
        ctx.body = response.toObject();
        ctx.status = response.statusCode;
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
  }
}

module.exports = health;
