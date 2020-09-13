const fetch = require('node-fetch');


// create an issue card
exports.createIssue = function (trello_key, trello_token, list_id, issue_title, label_ids) {
  if (label_ids.length > 0) {
    return fetch(`https://api.trello.com/1/cards?key=${trello_key}&token=${trello_token}&idList=${list_id}&name=${issue_title}&idLabels=${label_ids}`, {
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
  else {
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
}