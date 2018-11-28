
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

 database.ref().on("child_added", function(childSnapshot) {

    var dataName = childSnapshot.val().name;
    var dataDestination = childSnapshot.val().destination;
    var dataTime = (childSnapshot.val().time);
    var dataFrequency = childSnapshot.val().frequency;
    var nowTime = moment().format('HH:mm');    
    var timeDiff = moment.duration(nowTime).asMinutes() - moment.duration(dataTime).asMinutes();
    var remainder = timeDiff % dataFrequency;
    var timeRemain = dataFrequency - remainder;
        if (timeRemain > dataFrequency){
            timeRemain = timeRemain - dataFrequency;
        }
    var nextTrain = moment().add(timeRemain, 'minutes').format('HH:mm');

    console.log(moment.duration(nowTime).asMinutes())
    console.log(Math.abs(moment.duration(dataTime).asMinutes()))
    console.log(remainder)
    console.log(timeRemain)

    var newRow = $("<tr>").append(
        $("<td>").text(dataName),
        $("<td>").text(dataDestination),
        $("<td>").text(dataFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(timeRemain)
        );

    $("#train-schedule").append(newRow);
});



$("#submit").on("click", function(){
    event.preventDefault();
    
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    var checkTime = moment(trainTime, 'HH:mm', true).isValid();
    var checkTime2 = moment(trainTime, 'H:mm', true).isValid();

    console.log(checkTime2)

    if(trainName.length > 0 && trainDestination.length > 0 && trainTime.length > 0 && trainFrequency > 0){
        
        $("#error").empty();

        if (checkTime === true || checkTime2 === true){
            $("#error").empty();
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

        }   else { 
            $("#error").append($("<h5 style='color: red'>").text("Check time formatting!"));
        }





    } else if ($("#error").children().length === 0){
        
        $("#error").append($("<h5 style='color: red'>").text("Make sure all inputs are filled in!"));
    }
   
    

})