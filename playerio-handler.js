require('./playerIO/PlayerIOClient.development');

module.exports = (request, response) => {
    response.setHeader('Content-Type', 'text/plain');

    if (request) {
        authenticate(response);
    }
}

async function authenticate(response) {
    await PlayerIO.authenticate(
        'test-game-45jh8qdc5uopyfdwbbimqw',    //Game id
        'public',                              //Connection id
        { userId:'zsannenmars' },                 //Authentication arguments
        {},
        function(client) {
            console.log('SUCCESS', client);
            response.end('Connected to PlayerIO!');

            // use local development server
            client.multiplayer.developmentServer = 'localhost:8000'

            // join a room
            client.multiplayer.createJoinRoom('mainroom', 'bounce', true, null, { name: 'zsannenmars' }, function (connection) {
                global.connection = connection
                console.log('notice', '', 'connected to room')
                connection.addMessageCallback("*", function (message) {
                    console.log('MESSAGE', message);
                    connection.disconnect();
                })
                connection.addDisconnectCallback(function () {
                    console.log('error','', 'disconnected from room')
                });
            },
                function(error) { 
                    console.log('error from joining a room', error);
                }
            );
            //Success!
            //You can now use the client object to make API calls.
        },
        function(error) {
            console.log('ERROR', error);
            response.end('Failed to connect to playerIO');

            if (error.code == PlayerIOErrorCode.UnknownGame) {
                //Unknown game id used
            } else {
                //Another error
            }
        }
    );    
}