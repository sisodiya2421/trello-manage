var create_board = require('./components/board_create');
var create_list = require('./components/list_create');
var create_issue = require('./components/issue_create');
var get_board_id = require('./components/board_id');
var get_list_Id = require('./components/list_id');
var create_label = require('./components/create_label');
var labels_on_board = require('./components/labels_on_board');

const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const context = github.context;
        const payload = context.payload;
        const repo_name = core.getInput('repo-name');
        const trello_username = core.getInput('trello-username');
        const issue_title = getIssueTitle(payload);
        const issue_labels = getIssueLabels(payload);
        //console.log(issue_labels)
        //console.log(issue_labels.length)

        // get environment variables
        const trello_key = process.env.TRELLO_KEY
        const trello_token = process.env.TRELLO_TOKEN
        
        var board_id = null;
        var list_id = null;
        // check if board is present
        board_id = await get_board_id.getBoardId(trello_username, trello_key, trello_token, repo_name);
        if (!board_id) {
            await create_board.createBoard(trello_key, trello_token, repo_name)
            board_id = await get_board_id.getBoardId(trello_username, trello_key, trello_token, repo_name);
            const labelCreation = async  function () {
                const label_names = ['bug',
                                'documentation',
                                'duplicate',
                                'enhancement',
                                'good first issue',
                                'help wanted',
                                'invalid',
                                'questions',
                                'wontfix'];
                const label_colors = ['red','blue','black','sky','purple','green','yellow','pink','orange'];
                for (var i =0; i < label_names.length; i++) {
                    create_label.create_label(board_id, trello_key, trello_token, label_names[i], label_colors[i]);
                }
            };
            await labelCreation();
        }
        
        // check if issues list is present or not
        list_id = await get_list_Id.getListId(board_id, trello_key, trello_token);
        if (!list_id) {
            await create_list.createList(trello_key, trello_token, board_id)
            list_id = await get_list_Id.getListId(board_id, trello_key, trello_token);
        }

        // segregating labels that need to be assigned
        var labels_Ids_From_Trello = [];
        if (issue_labels.length > 0) {
            var labelsFromTrello = await labels_on_board.labelsOnBoard(board_id, trello_key, trello_token);
            console.log(`printting labels ${labelsFromTrello}`)
            labelsFromTrello.forEach(element => {
                for (var i = 0; i<issue_labels.length; i++) {
                  if (element.name === issue_labels[i]) {
                    labels_Ids_From_Trello.push(element.id);
                  }
                }
              });
        }
        

        // adding issue to the issue list
        //console.log(`label ids: ${labels_Ids_From_Trello}`)
        await create_issue.createIssue(trello_key, trello_token, list_id, issue_title, labels_Ids_From_Trello);

    } catch (error) {
    core.setFailed(error.message);
    }
    };

    function getIssueTitle(payload) {
        if (payload.issue && payload.issue.title) {
        return payload.issue.title;
        }
    }

    function getIssueLabels(payload) {
        let labels = [];
        if (payload.issue && payload.issue.labels) {
            incomingData = (payload.issue.labels);
            for (var i = 0; i<incomingData.length;i++) {
                labels.push(incomingData[i].name);
            }
            return labels;
        }
        else {
            return null;
        }
    }


main();