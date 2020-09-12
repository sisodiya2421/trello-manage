const fetch = require('node-fetch');


// create a issue 
exports.createIssue = function (trello_key, trello_token, list_id, issue_title) {
  return fetch(`https://api.trello.com/1/cards?key=${trello_key}&token=${trello_token}&idList=${list_id}&name=${issue_title}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(console.log(`issue has been added to the List.`))
    .catch(err => console.error(err));
}