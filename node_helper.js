/* Magic Mirror
 *
 * Module: MMM-ISS
 *
 * By Mykle1 - MIT Licensed
 *
 */

const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getISS: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                //console.log(response.statusCode); // for checking in terminal
                this.sendSocketNotification('ISS_RESULT', result);
            }
        });
        this.getVELALT();
    },

    getVELALT: function(url) {
        request({
            url: "https://api.wheretheiss.at/v1/satellites/25544",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
                //console.log(response.statusCode); // for checking in terminal
                this.sendSocketNotification('VELALT_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_ISS') {
            this.getISS(payload);
        }
        if (notification === 'GET_VELALT') {
            this.getVELALT(payload);
        }
    }
});
