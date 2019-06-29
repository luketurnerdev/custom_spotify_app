//Return the amount of tracks the user has selected.
const SaveTrackAmount = () => {
    let selectedAmount;
    let trackArr = document.getElementsByName("track-amount");
    trackArr.forEach((element) =>{
      if (element.checked === true) {
        selectedAmount = element.value;
  
        //HTML change
        document.getElementById("generate-playlist").innerHTML = `Generate playlist of ${selectedAmount} tracks`;
        console.log(selectedAmount);
      };
      
    });
    return selectedAmount;

};

export default SaveTrackAmount;