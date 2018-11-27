
var config = {
    apiKey: "AIzaSyB1Mx8kAAc1ABhpr_VGiBz1slGWbmPrBS4",
    authDomain: "train-schedule-2ad53.firebaseapp.com",
    databaseURL: "https://train-schedule-2ad53.firebaseio.com",
    projectId: "train-schedule-2ad53",
    storageBucket: "train-schedule-2ad53.appspot.com",
    messagingSenderId: "286451302010"
  };
  firebase.initializeApp(config);

 var database = firebase.database(); 
















$("#submit").on("click", function(){
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    })

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");



})