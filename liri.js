// Requires
require("dotenv").config();
const keys = require("./keys.js")
const axios = require("axios")
const Spotify = require('node-spotify-api')
const moment = require('moment');
const chalk = require('chalk');
const fs = require("fs")

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
        if(process.argv[2] === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function(err,data) {
                if(err) {
                    console.log(err)
                }
                dataArr = data.split(",")
                if(dataArr[0] === "spotify-this-song") {
                    userQuery = dataArr[1].replace(/"/g,"")
                    liri.spotifyquery()
                }
                if(dataArr[0] === "movie-this") {
                    userQuery = dataArr[1].replace(/"/g,"")
                    liri.moviequery()
                }
                if(dataArr[0] === "concert-this") {
                    userQuery = dataArr[1].replace(/"/g,"")
                    liri.bandquery()
                }
            })
        }
    },
    spotifyquery : function() {
        spotify.search({ type: 'track', query: userQuery, limit: 1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
                liri.printDivider()
                liri.printOutput("Artist", data.tracks.items[0].artists[0].name);
                liri.printOutput("Song", data.tracks.items[0].name);
                liri.printOutput("Preview URL", data.tracks.items[0].preview_url);
                liri.printOutput("Album", data.tracks.items[0].album.name);
                liri.printDivider()
                liri.printBareOutput("\n")
        })
    },
    bandquery : function() {
        var queryUrl = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function(response) {
                liri.printDivider()
                liri.printBareOutput("Upcoming Concerts for " + userQuery)
                liri.printDivider()
                for (var i = 0; i < response.data.length; i++) {
                liri.printBareOutput(response.data[i].venue.name)
                if(response.data[i].venue.region === "") {
                    liri.printBareOutput(response.data[i].venue.city + ", " + response.data[i].venue.country)
                } else{
                liri.printBareOutput(response.data[i].venue.city + ", " + response.data[i].venue.region)
                }
                var date = moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm a")
                liri.printBareOutput(date)
                liri.printDivider()
                }
                liri.printBareOutput("\n")
        })
    },
    moviequery : function() {
        var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
                liri.printDivider()
                liri.printOutput("Title", response.data.Title);
                liri.printOutput("Year", response.data.Year);
                liri.printOutput("IMDB Rating", response.data.imdbRating);
                liri.printOutput("RT Rating", Object.values(response.data.Ratings[1]).slice(1));
                liri.printOutput("Country", response.data.Country);
                liri.printOutput("Language", response.data.Language);
                liri.printOutput("Plot", response.data.Plot);
                liri.printOutput("Actors", response.data.Actors);
                liri.printDivider()
                liri.printBareOutput("\n")
            }
        );
    },
    printOutput : function(x,y) {
        console.log(chalk.underline(x) + ": " + y)
        fs.appendFileSync('log.txt', x + ": " + y + "\n", function (err) {
            if (err) throw err;
          });
    },
    printDivider : function() {
        console.log("------------------------------------------------------------------------------")
        fs.appendFileSync('log.txt', "-----------------------------------------------------------------------------\n", function (err) {
            if (err) throw err;
          });
    },
    printBareOutput : function(x) {
        console.log(x)
        fs.appendFileSync('log.txt', x + "\n", function (err) {
            if (err) throw err;
          });
    }
}

// Run Logic
liri.logic()