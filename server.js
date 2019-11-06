const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const login = require('./login');
const playerio = require('./playerio-handler');

const hostname = '127.0.0.1'; //localhost
const port = 9000;

const server = http.createServer(handle_request);

server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port);
});

function handle_request(request, response) {   
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');    
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    let path = url.parse(request.url).pathname;

    switch(path) {
        case '/':
            response.end('<h1>Welcome to Node World!</h1>');
            break;

        case '/profile':
            response.end('<h1>Hello, I am Zsannen!</h1>');
            break;

        case '/login':
            response.setHeader('Content-Type', 'text/plain');

            let message = '';
            request.on('data', function(chunk) {
                message = isValidCredentials(chunk.toString());
            });
            
            request.on('end', function() {
                response.end(message);
            });

            break;

        case '/connect-to-playerio':
            console.log('Im here!');
            playerio(request, response);
            break;

        default:
            response.statusCode = 404;
            response.end('<h1>Route not found!</h1>');
            break;
    }
}

function isValidCredentials(_data) {
	_data = JSON.parse(_data);
	
	if (_data.username == 'zsannen' && _data.password == 'mypass') {
		return 'Successfully logged in!';
	}
	
	return 'Incorrect username/password. Please try again.'
}