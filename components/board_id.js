const fetch = require('node-fetch');

var board_id = null
// get board id
exports.getBoardId = function (trello_username, trello_key, trello_token, repo_name) {
    fetch(`https://api.trello.com/1/members/${trello_username}/boards?key=${trello_key}&token=${trello_token}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => {
            incomingData = JSON.parse(text)
            for (var i = 0; i < incomingData.length; i++) {
                if (repo_name === incomingData[i].name) {
                    board_id = incomingData[i].id
                }
            }
            return board_id;
        })
        .catch(err => console.error(err));
}