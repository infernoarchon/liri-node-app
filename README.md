# LIRI Bot
A node-based CLI application that helps you find Spotify, Bandsintown, and OMDB information.

![Liri Bot Interface](https://www.alanchen.com/wp-content/uploads/2018/12/lirithumb3.png)

## Setup
1. Clone directory and run npm install
2. To use Spotify queries, you will need an API key to create a `.env` file with the following values:

`SPOTIFY_ID=your-spotify-id`\
`SPOTIFY_SECRET=your-spotify-secret`

## Usage
- `node liri spotify-this-song <song name>`
- `node liri concert-this <band name>`
- `node liri movie-this <movie name>`
- `node liri do-what-it-says (modify random.txt)`

## APIs used
- Spotify
- Bandsintown
- OMDB
