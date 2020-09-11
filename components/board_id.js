const github = require('@actions/github');
const fetch = require('node-fetch');

const trello_key = process.env.TRELLO_KEY
const trello_token = process.env.TRELLO_TOKEN
const trello_username = process.env.TRELLO_USERNAME
const repo_name = github.repository

// get board id
export function boardId() {
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
        console.log(board_id)
    })
    .catch(err => console.error(err));
}