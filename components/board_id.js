const fetch = require('node-fetch');

// get board id
const getBoardId = async function (trello_username, trello_key, trello_token, repo_name) {
    var board_id = null;
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
        })
        .catch(err => console.error(err));
    return board_id;
}

exports.getBoardId = getBoardId;