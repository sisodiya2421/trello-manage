const fetch = require('node-fetch');
const github = require('@actions/github');

const trello_key = process.env.TRELLO_KEY
const trello_token = process.env.TRELLO_TOKEN
const list_id = ''
const issue_title = ''

// create a issue 
export function createIssue() {
fetch(`https://api.trello.com/1/cards?key=${trello_key}&token=${trello_token}&idList=${list_id}&name=${issue_title}`, {
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