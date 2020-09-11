const fetch = require('node-fetch');

const trello_key = process.env.TRELLO_KEY
const trello_token = process.env.TRELLO_TOKEN
const board_id = ''

export function createList() {
// create list with name issues
fetch(`https://api.trello.com/1/lists?key=${trello_key}&token=${trello_token}&name=issues&idBoard=${board_id}`, {
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