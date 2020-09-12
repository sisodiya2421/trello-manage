const fetch = require('node-fetch');
const core = require('@actions/core');
const github = require('@actions/github');

const trello_key = process.env.TRELLO_KEY
const trello_token = process.env.TRELLO_TOKEN
const trello_username = core.getInput('trello-username');
const repo_name = core.getInput('repo-name');

var board_id = null;
// get board id
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


exports.fetch = fetch;