const fetch = require('node-fetch');
const github = require('@actions/github');

const trello_key = 'c2c94fd90e1f4650e3225bbb28f6ef16'
const trello_token = '4d66bf4b041760ae8c790dc4d935cc4b1a27b3c134fc2bbe593c25d09b966e2e'
const repo_name = 'test3'

// create board
export function createBoard() {
  fetch(`https://api.trello.com/1/boards/?key=${trello_key}&token=${trello_token}&name=${repo_name}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}