var alarmTime;
var alarmCheck;

$(window).load(function() {
alarmCheck=true;
});
function updateClock()
 {
    var currentTime = moment().format('h:mm a');
    $("#currentTime").html(currentTime);
    var nowTime= moment();
    if(alarmTime && alarmCheck){
    	var timetoAlarm="Alarm to go off in ";
    	timetoAlarm+=alarmTime.from(nowTime);
    	$("#timetoAlarm").html(timetoAlarm);
    	var what=alarmTime.diff(nowTime);
    	if(what<10){
    		
 			$('#snooze-btn').show(1000);
    		$("#timetoAlarm").html("Alarm going off now!");
    		alarmCheck=false;
    		alarmTime=false;
    		console.log(alarmTime);
    	}
    }
 }
 
 function checkVals(){
    var theCheck=true;
 	$('#errors').html("");
 	var theErrors="";
 	var timeof=$('#dropdown').val();
 	console.log(timeof);
 	if(timeof=="none"){
 	theErrors+="<p>I think you forgot something important!</p>";
 	theCheck=false;
 	}
 	var hrs=$('#hour').val();
 	if(hrs){
 		hrs= parseInt(hrs);
 		if(hrs>0 || hrs<13){
 		theCheck=true;
 		}
 		else{
 		theErrors+="<p>You know that's not how you write the hour</p>";
 		theCheck=false;
 		}
 	}
 	else{
 	    theErrors+="<p>You forgot to enter the hour</p>";
 		theCheck=false;
 	}
 	
 	var mins=$('#min').val();
 	if(mins){
 		mins=parseInt(mins);
 		if(mins>=0 || mins<=60){
 		   theCheck=true;
 		}
 		else{
 		    theErrors+="<p>You know that's not how many minutes there are</p>";
 			theCheck=false;
 		}
 	}
 	else{
 	    theErrors+="<p>You forgot to enter the mins</p>";
 		theCheck=false;
 	}
 	 	
 	$('#errors').html(theErrors);
 	$("#errors").fadeIn(3000);
    $("#errors").fadeOut(6000);
    return(theCheck);
 }
 
function setAlarm(){
	var newHr=parseInt($('#hour').val());
	var newMin=parseInt($('#min').val());
	var currentTime=moment();
	var newTime=moment();
	newTime.hours(newHr);
	newTime.minutes(newMin);
	newTime.seconds(0);	
	newTime.milliseconds(0);
	if(newTime.format("a")=="pm" && $('#dropdown').val()=="am" ){
	 newTime.add('days',1);
	}
	else if($('#dropdown').val()=="pm"){
		newHr+=12;
		newTime.hours(newHr);
	}
	if(newTime.diff(currentTime)<0){
		newTime.add('days',1);}
		
	return(newTime );
}

 
 $(document).ready(function(){
          setInterval('updateClock()', 10);

          $('.dropdown').dropkick();
          $("#set-btn").click(function() {
 				if(checkVals()){
 				 alarmTime=setAlarm();
 				 alarmCheck=true;
 				}
 		
		 });
		          
          
        });