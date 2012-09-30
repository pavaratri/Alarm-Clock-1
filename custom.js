var alarmTime; //stores the alarm time
var alarmCheck; //boolean to check if alarm is set

var f = $('iframe');
var url = f.attr('src').split('?')[0];

// Listen for messages from the player
if (window.addEventListener){
    window.addEventListener('message', onMessageReceived, false);
}
else {
    window.attachEvent('onmessage', onMessageReceived, false);
}

function onMessageReceived(e) {
    var data = JSON.parse(e.data);
    cosole.log(data);
}

function post(action, value) {
    var data = { method: action };
    
    if (value) {
        data.value = value;
    }
    
    f[0].contentWindow.postMessage(JSON.stringify(data), url);
}
$(window).load(function() {
alarmCheck=true;
});
//******************* UPDATE CLOCK ******************************
function updateClock()
 {
    //get the current moment in terms of hours, minutes and am/pm
    var currentTime = moment().format('h:mm a');
    //display current time
    $("#currentTime").html(currentTime);
    //get complete moment of current time
    var nowTime= moment();
    //if there is an alarm and a time for it exists
    if(alarmTime && alarmCheck){
        //display approx time till alarm goes off
    	var timetoAlarm="Alarm to go off ";
    	timetoAlarm+=alarmTime.from(nowTime);
    	$("#timetoAlarm").html(timetoAlarm);
    	// get the difference in milliseconds between current time and alarm time
    	var what=alarmTime.diff(nowTime);
    	//accouting for small glitches in browser speeds,we give a 10 millisecond window to check if current time matches alarm time
    	if(what<10){
    	//fade in light box
    		$("#lightbox, #lightbox-panel").fadeIn(300);
    		//play video
            post("play");
            //set alarm message
    		$("#timetoAlarm").html("Alarm going off now!");
    		//remove alarm time
    		alarmCheck=false;
    		alarmTime=false;
    	}
    }
 }
 //************ FUNCTION TO CHECK VALIDITY OF INPUTS *************************
 
 function checkVals(){
    // boolean to check for validity
    var theCheck=true;
    //div that displays error messages set to empty
 	$('#errors').html("");
 	//string of error message
 	var theErrors="";
 	// check that am/pm is selected
 	var timeof=$('#dropdown').val();
 	if(timeof=="none"){
 		//if no value is selected, display an error message
 		theErrors+="<p>I think you forgot something important!</p>";
 		//there is an error
 		theCheck=false;
 	}
 	//get hours value
 	var hrs=$('#hour').val();
 	//check that there is a value entered
 	if(hrs){
 	    //get the integer value
 		hrs= parseInt(hrs);
 		//if the value is between 1-12, then it's valid
 		if(hrs>0 && hrs<13){
 		theCheck=true;
 		}
 		//else display an error
 		else{
 		theErrors+="<p>You know that's not how you write the hour</p>";
 		theCheck=false;
 		}
 	}
 	//if no value is present in the hours input, display error
 	else{
 	    theErrors+="<p>You forgot to enter the hour</p>";
 		theCheck=false;
 	}
 	//get the minutes value
 	var mins=$('#min').val();
 	//if there is a value
 	if(mins){
 	//get the integer value of the input
 		mins=parseInt(mins);
 		//if the value is between 0 and 60, it is valid
 		if(mins>=0 && mins<=60){
 		   theCheck=true;
 		}
 		//else display and error
 		else{
 		    theErrors+="<p>You know that's not how many minutes there are</p>";
 			theCheck=false;
 		}
 	}
 	//if there's no value, display and error
 	else{
 	    theErrors+="<p>You forgot to enter the mins</p>";
 		theCheck=false;
 	}
 	 //display the errors	
 	$('#errors').html(theErrors);
 	//cool fade
 	$("#errors").fadeIn(3000);
    $("#errors").fadeOut(6000);
   
    return(theCheck);
 }
 
 // ******************** setting the alarm **************************************
 
function setAlarm(){
    // get the hour and min values entered by the user and change them into integers
	var newHr=parseInt($('#hour').val());
	var newMin=parseInt($('#min').val());
	//get current time
	var currentTime=moment();
	//create a moment for alarm
	var newTime=moment();
	//set hours, mins, second and milliseconds of the new  moment
	newTime.hours(newHr);
	newTime.minutes(newMin);
	newTime.seconds(0);	
	newTime.milliseconds(0);
	//if the current time is pm and the alarm is set for am, presume it's for the next day
	if(newTime.format("a")=="pm" && $('#dropdown').val()=="am" ){
	 newTime.add('days',1);
	}
	//convert 12hr time to 24hr
	if($('#dropdown').val()=="pm"){
		newHr+=12;
		newTime.hours(newHr);
	}
	//if user enters a time that's behind current time, add a day.
	else if(newTime.diff(currentTime)<0){
		newTime.add('days',1);
		}
	//return the new time to alarm time
	return(newTime );
}


//******************************************* MAIN FUNCTION ***************************************************
 
 $(document).ready(function(){
 
          // every 10 milliseconds update the clock
          setInterval('updateClock()', 10);        
          
          //call dropkick on dropdown    
          $('.dropdown').dropkick();
          
          
          //do not take non numbers as inputs but accept special keys like backspace, delete
          $("#hour").keydown(function(event) {
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) ||  (event.keyCode >= 35 && event.keyCode <= 39)) {return;}
        else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {event.preventDefault(); }   
    });
    $("#min").keydown(function(event) {
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) ||  (event.keyCode >= 35 && event.keyCode <= 39)) {return;}
        else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {event.preventDefault(); }   
    });
    
          //when the set alarm button is pressed..
          
          $("#set-btn").click(function() {
          
          //check that there is valid input
 				if(checkVals()){
 				// assign the alarm time
 				 alarmTime=setAlarm();
 				 //alarm is now set
 				 alarmCheck=true;
 				}
 		
		 });
		 
		 //when the snooze button is pressed...
		 
		 $("a#snooze-btn").click(function(){
		 		//pause the video
		 		post("pause");
		 		//fade out the lightbox
     			$("#lightbox, #lightbox-panel").fadeOut(300);
     			//turn the alarm back on
     			alarmCheck=true;
     			//set alarm time to 9 mins from current time
     			var currentTime=moment();
     			alarmTime=currentTime.add('minutes',9);
 		});
		          
          
        });