import SaveTimeData from "./SaveTimeData";
import SaveTrackAmount from "./SaveTrackAmount";
const ViewTopTracks = () => {


    let selectedAmount = SaveTrackAmount();
    let selectedTime = SaveTimeData();
    console.log(selectedTime);

    // if (selectedAmount != undefined && selectedTime != undefined) {

    //     //Gather track data
    //   fetchUserTracks().then(function(response) {
    //     let successHeader = document.createElement("h2");
    //     document.getElementById("tracks-container").appendChild(successHeader);
    //     successHeader.innerHTML = "Here are your top tracks:"
    
    //     //Display top tracks to the user
    //     for (let i=0; i<response.items.length; i++){
    
    //       let newTrack = document.createElement("li");
    //       document.getElementById("tracks-container").appendChild(newTrack);
    //       newTrack.innerHTML = "Track: " + response.items[i].name + " , Artist: " + response.items[i].artists[0].name;
    //     }
    
    //     //Render reccomends button
    
    //     //Create recommendation button
    
    //     let reccomendationButton = document.createElement('button');
    //     reccomendationButton.textContent = "Get reccomendations";
    //     reccomendationButton.id = 'reccomendation-button';
    //     document.getElementById("tracks-container").appendChild(reccomendationButton);
    //     document.getElementById("reccomendation-button").addEventListener('click', generateReccomendations);
    //   });
    // } else {
    //   console.log("Params not selected");
    //   //HTML rendering
    //   error = document.createElement('h1');
    //   error.textContent = "Please select a time period and track amount first.";
    //   document.getElementById("tracks-container").appendChild(error);
    // }

};

export default ViewTopTracks;