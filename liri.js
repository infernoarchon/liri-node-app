// Requires
require("dotenv").config();
const keys = require("./keys.js")
const axios = require("axios")
const Spotify = require('node-spotify-api')
const chalk = require('chalk');

// Global Variables
var spotify = new Spotify(keys.spotify);
var input = []
var userQuery = []

// Main App Logic
var liri = {
    logic : function() {
        if(process.argv[2] === "spotify-this-song") {
            if(process.argv[3] == null) {
                userQuery = "The Sign Ace of Base"
                liri.spotifyquery()
            }
            else {
                for (var i=3; i < process.argv.length; i++) {
                    input.push(process.argv[i])
                }
                userQuery = input.join(' ')
                liri.spotifyquery()   
            }
        }
        if(process.argv[2] === "concert-this") {
            if(process.argv[3] == null) {
                console.log("Please enter an artist name")
            }
            else {
                for (var i=3; i < process.argv.length; i++) {
                    input.push(process.argv[i])
                }
                userQuery = input.join(' ')
                liri.bandquery()   
            }
        }
        if(process.argv[2] === "movie-this") {
            if(process.argv[3] == null) {
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
                console.log("It's on Netflix!")
            }
            else {
                for (var i=3; i < process.argv.length; i++) {
                    input.push(process.argv[i])
                }
                userQuery = input.join(' ')
                liri.moviequery()   
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
    },
    bandquery : function() {

    },
    moviequery : function() {
        var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
                console.log(chalk.underline("Title") + ": " + response.data.Title);
                console.log(chalk.underline("Year") + ": " + response.data.Year);
                console.log(chalk.underline("IMDB Rating") + ": " + response.data.imdbRating);
                console.log(chalk.underline("RT Rating") + ": " + Object.values(response.data.Ratings[1]).slice(1));
                console.log(chalk.underline("Country") + ": " + response.data.Country);
                console.log(chalk.underline("Language") + ": " + response.data.Language);
                console.log(chalk.underline("Plot") + ": " + response.data.Plot);
                console.log(chalk.underline("Actors") + ": " + response.data.Actors);

            }
        );
    }
}

// Run Logic
liri.logic()