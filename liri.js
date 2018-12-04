// Requires
require("dotenv").config();
const keys = require("./keys.js")
const axios = require("axios")
const Spotify = require('node-spotify-api')
const chalk = require('chalk');

// Global Variables
var spotify = new Spotify(keys.spotify);
var input = []
var userquery = []

// Main App Logic
var liri = {
    logic : function() {
        if(process.argv[2] === "spotify-this-song") {
            if(process.argv[3] == null) {
                userquery = "The Sign Ace of Base"
                liri.spotifyquery()
            }
            else {
                for (var i=3; i < process.argv.length; i++) {
                    input.push(process.argv[i])
                }
                userquery = input.join(' ')
                liri.spotifyquery()   
            }
        }
    },
    spotifyquery : function() {
        spotify.search({ type: 'track', query: userquery, limit: 1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        console.log(chalk.underline("Artist") + ": " + data.tracks.items[0].artists[0].name);
        console.log(chalk.underline("Song") + ": " + data.tracks.items[0].name);
        console.log(chalk.underline("Preview URL") + ": " + data.tracks.items[0].preview_url);
        console.log(chalk.underline("Album") + ": " + data.tracks.items[0].album.name);    
        })
    }
}

// Run Logic
liri.logic()