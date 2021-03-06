const db = require('./conn'); // imports our database, yay! :D

class ClassSurveyModel {
    // "Whenever you create or working with an instance you will need these three items"
    constructor(id, topic_name, topic_score) {
        this.id = id;
        this. topic_name = topic_name;
        this.topic_score = topic_score;
    }
     // async will wait for that request to finish - you can assign this to a variable instead of doing a callback function. 
    static async getAllTopicData() {
        try { // tells our service to wait for that response and then return that value
            const response = await db.any(
                `SELECT topic_name, ranking_title FROM topics 
                    JOIN rankings
                    ON topics.topic_score = rankings.id
                ORDER BY topics.topic_name
                `
            )
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = ClassSurveyModel;