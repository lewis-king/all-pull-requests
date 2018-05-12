const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const pullRequestsService = require('../service/pullRequestService');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', {});
});

router.post('/pull-requests/open/', function(req, res, next) {
    pullRequestsService.retrieveOpenPullRequests(function (payload) {
        res.setHeader('Content-Type', 'application/json');
        res.json(payload);
    });
});

module.exports = router;
