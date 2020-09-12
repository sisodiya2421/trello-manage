var create_board = require('./components/board_create');
var create_list = require('./components/list_create');
var create_issue = require('./components/issue_create');
var get_board_id = require('./components/board_id');
var get_list_Id = require('./components/list_id');

const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const context = github.context;
        const payload = context.payload;
        const repo_name = core.getInput('repo-name');
        const trello_username = core.getInput('trello-username');
        const issue_title = getIssueTitle(payload);

        // get environment variables
        const trello_key = process.env.TRELLO_KEY
        const trello_token = process.env.TRELLO_TOKEN
        
        // check if board is present
        let board_id = get_board_id.getBoardId(trello_username, trello_key, trello_token, repo_name);
        if (!board_id) {
            create_board.createBoard(trello_key, trello_token, repo_name)
            board_id = get_board_id.getBoardId(trello_username, trello_key, trello_token, repo_name);
        }
        
        // check if issues list is present or not
        let list_id = get_list_Id.getListId(board_id, trello_key, trello_token);
        if (!list_id) {
            create_list.createList(trello_key, trello_token, board_id)
            list_id = get_list_Id.getListId(board_id, trello_key, trello_token);
        }
        // adding issue to the issue list
        create_issue.createIssue(trello_key, trello_token, list_id, issue_title)

    } catch (error) {
    core.setFailed(error.message);
    }
    };

    function getIssueTitle(payload) {
        if (payload.issue && payload.issue.title) {
        return payload.issue.title;
        }
    }


main();