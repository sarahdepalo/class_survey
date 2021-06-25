'use strict';

const express = require('express');
const router = express.Router();
const ClassSurveyModel = require('../models/ClassSurveyModel');

router.get('/', async (req, res) => {
    const topicData = await ClassSurveyModel.getAllTopicData();
    const rankings = await ClassSurveyModel.getAllRankings();
    res.render('template', {
        locals: {
            title: 'Class Survey',
            data: topicData,
            rankings: rankings
        },
        partials: {
            body: 'partials/home'
        }
    })
});

router.get('/error', async (req, res) => {
    const { error } = req.query;

    let errorMessage = error;

    if (!error) {
        errorMessage = "No Error Message Defined";
    }
    res.render('template', {
        locals: {
            title: 'ERROR PAGE',
            errorMessage: errorMessage
        },
        partials: {
            body: 'partials/error'
        }
    })
})

router.post('/update', async (req, res) => {
    let response;

    // Gives a key as a variable and a value as a variable
    for (let key in req.body) {
        console.log("KEY AND VALUE: ", key, req.body[key]);
        response = await ClassSurveyModel.updateRanking(key, req.body[key]);
    }

    if (response.rowCount !== 1) {
        // redirects to the error page and sends the response to the error message in router.get(error)
        res.redirect(`/error?error=${response}`);
    } else {

        res.redirect('/');
    };
    console.log('RESPONSE IN POST: ', response);


})

module.exports = router;