require("dotenv").config();
const keys = require("./keys.js")
var axios = require("axios")
var Spotify = require('node-spotify-api')

var spotify = new Spotify(keys.spotify);
var input = []

if(process.argv[2] === "spotify-this-song") {
    for (var i=3; i < process.argv.length; i++) {
        input.push(process.argv[i])
    }
    spotify.search({ type: 'track', query: input.join(' '), limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].preview_url);
      console.log(data.tracks.items[0].album.name);    
      });
}