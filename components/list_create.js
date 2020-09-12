const fetch = require('node-fetch');


export function createList(trello_key, trello_token, board_id) {
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
        .then(console.log(`issue List created.`))
        .catch(err => console.error(err));
}