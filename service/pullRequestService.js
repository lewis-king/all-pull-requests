const request = require('request');
const repos = require('../config/repos.json');
const Constants = require('../config/constants');

function retrieveOpenPullRequests(callback) {
    const openPullRequestResponses = [];
    repos.forEach(repo => {
        const reqURL = Constants.bitbucketAPIContextRoot + repo.project + '/' + repo.repo + Constants.pullRequestAPIPathSuffix;
        request(reqURL, function (error, response, body) {
            let openPullRequests = JSON.parse(body);
            openPullRequestResponses.push(openPullRequests);
            if (openPullRequestResponses.length === repos.length) {
                callback(openPullRequestResponses);
            }
        });
    });
}

module.exports = {
  retrieveOpenPullRequests
};