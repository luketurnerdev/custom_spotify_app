const dataTwo = require("./dataTwo");
const spotifyTracks = [];
let spotifyAlbums = [];
let spotifyPlaylists = [];
let youtubeLinks = [];
let soundcloudLinks = [];

//  Where link was in the message
const content =  dataTwo.messages.filter(message => message.content);
content.forEach((message) => {
  //  Push in just the track URIs into an array
  if (message.content.includes("spotify.com/track")) {
    spotifyTracks.push (message.content.slice(message.content.indexOf('/track/')+7,message.content.indexOf('?')));
  }
});

//  Where link was a share
const shares = dataTwo.messages.filter(message => message.share);
const valid = shares.filter(share => share.share.link);
valid.forEach((message) => {
  if (message.share.link.includes("spotify.com/track")) {
    spotifyTracks.push (message.share.link.slice(message.content.indexOf('/track/')+7,message.content.indexOf('?')))
  }
})
// console.log(spotifyTracks)

module.exports = spotifyTracks;

