const SaveTimeData = () => {
    let selectedTime;
    let timeArr = document.getElementsByName("time-period");
    timeArr.forEach((element) => {
      if (element.checked === true) {
        selectedTime = element.value;
      };
  
      switch (selectedTime) {
        case ("1-month"):
          selectedTime = "short_term";
          break;
  
        case ("6-months"):
        selectedTime = "medium_term";
        break;
  
        case ("all-time"):
        selectedTime = "long_term";
          break;
  
        default:
          break;
      }

  
    });   

    return selectedTime;

}

export default SaveTimeData;