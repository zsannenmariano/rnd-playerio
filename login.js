module.exports = (request, response) => {
	response.setHeader('Content-Type', 'text/plain');

	let message = '';
	request.on('data', function(chunk) {
		message = isValidCredentials(chunk.toString());
	});
	
	request.on('end', function() {
		response.end(message);
	});
};

function isValidCredentials(_data) {
	_data = JSON.parse(_data);
	
	if (_data.username == 'zsannen' && _data.password == 'mypass') {
		return 'Successfully logged in!';
	}
	
	return 'Incorrect username/password. Please try again.'
}