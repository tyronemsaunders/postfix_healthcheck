# Postfix Healthcheck

A simple [koa](http://koajs.com/) web app that checks if Postfix is running and for the ability to open a connection to the port Postfix is listening on.

## Installation

### Prequisites

* Ubuntu 16.04
* [Postfix](http://www.postfix.org/)
* [Node.js](https://nodejs.org/en/)

### General Installation

Clone this repository.
Navigate to the location on your system where you want to install this project and create a directory
```
$ mkdir myproject
$ cd myproject
$ git clone https://github.com/tubmanproject/postfix_healthcheck .
```
**Note:** *The dot at the end of the <b>git clone</b> command which will clone this repository into the `myproject` directory*


Run the following command:
`$ npm install`

## Usage

Start the project by running the following command:

`$ node src/index.js`

A web server should be running at <http://localhost:3333>

Check the health of Postfix at the following path <http://localhost:3333/health>

## Contributing

TBD

## Credits

Exception handling influenced by: <https://auth0.com/blog/building-and-securing-a-koa-and-angular2-app-with-jwt/>

## License

MIT
