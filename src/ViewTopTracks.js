import SaveTimeData from "./SaveTimeData";
import SaveTrackAmount from "./SaveTrackAmount";
import FetchUserTracks from "./FetchUserTracks";
import GenerateReccomendations from "./GenerateReccomendations";
import GeneratePlaylist from "./GeneratePlaylist";
const ViewTopTracks = () => {
    console.log('view called');
    let fetchUserTracks = FetchUserTracks();
    let selectedAmount = SaveTrackAmount();
    let selectedTime = SaveTimeData();
    let generateReccomendations = GenerateReccomendations;

    if (selectedAmount && selectedTime) {

        //Gather track data
        fetchUserTracks.then(function(response) {
        let successHeader = document.createElement("h2");
        document.getElementById("tracks-container").appendChild(successHeader);
        successHeader.innerHTML = "Here are your top tracks:"
    
        //Display top tracks to the user
        for (let i=0; i<response.items.length; i++){
    
          console.log(response.items[i]);
          let newTrack = document.createElement("li");
          document.getElementById("tracks-container").appendChild(newTrack);
          newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
        }
    
        //Create recommendation button
      
        let reccomendationButton = document.createElement('button');
        reccomendationButton.textContent = "Get reccomendations based on these tracks!";
        reccomendationButton.id = 'reccomendation-button';
        document.getElementById("tracks-container").appendChild(reccomendationButton);
        document.getElementById("reccomendation-button").addEventListener('click', generateReccomendations);

        //Create playlist button
        let playlistButton = document.createElement('button');
        playlistButton.textContent = "Generate playlist";
        playlistButton.id = "playlist-button";
        document.getElementById("tracks-container").appendChild(playlistButton);
        document.getElementById("playlist-button").addEventListener('click', GeneratePlaylist);





      });
    } else {
      console.log("Params not selected");
      //HTML rendering
      error = document.createElement('h1');
      error.textContent = "Please select a time period and track amount first.";
      document.getElementById("tracks-container").appendChild(error);
    }

};

export default ViewTopTracks;