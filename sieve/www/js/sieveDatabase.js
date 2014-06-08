
var data = new Firebase('https://sieve-tvot.firebaseio.com');
var userData = data.child('Users');		
var userShows = userData.child('shows');


logShow('Brady_Bunch', 'colin.com/img', '1234', '1234');
	
	var currentShows = [];
//var showList = [];

getShows();
//getChannels();
var test;


var test2 = [];


function logShow(showTitle, imageUrl, tmsId, seriesId) {

	var alreadyListed = false;
	var snap;
	
	userShows.once('value', function (snapshot) {
	
		var showRef = snapshot.forEach(function (childSnapshot) {
			
		//console.log('name' + childSnapshot.name());
			
		var childRef = childSnapshot.name();
			//console.log('name' +  childRef.name());
			if (showTitle == childSnapshot.child('showTitle').val()) {
				alreadyListed = true;	
				
				// Increment existing listing tally
				var timesWatched = childSnapshot.child('timesWatched').val();
				
				timesWatched++;
				
				var timeWatched = new Date();
				timeWatched.getTime();
				

				//console.log(timeWatched);
			
				userShows.child(childRef).update({timesWatched: timesWatched, lastWatched: timeWatched, imageUrl: imageUrl});
			}
		});
		
		// If not already created, create a listing for this show
		if(alreadyListed == false) {
			console.log('creating new listing!');
			// Create a new listing for the show
			
			var timeWatched = new Date();
			timeWatched.getTime();
			//console.log(timeWatched);
			userShows.push({showTitle: showTitle, tmsId: tmsId, seriesId: seriesId, timesWatched: 1, lastWatched: timeWatched, imageUrl: imageUrl});
		}
	})
	
}

function getShows() {
	
	//getShows = function(){
	
	userShows.once('value', function (snapshot) {
		createList(snapshot);

		console.log('Show list created!!');

	})
		
		 

		//return showList;
	//}
	
}



function createList(snapshot) {
var showList = [];
	snapshot.forEach(function(childSnapshot) {
	var tempShow = new Show(childSnapshot.name(),childSnapshot.child('showTitle').val(), childSnapshot.child('tmsId').val(), childSnapshot.child('seriesId').val(), childSnapshot.child('timesWatched').val(), childSnapshot.child('lastWatched').val(), childSnapshot.child('imageUrl').val());
	console.log('hello' + tempShow.index);				
	showList.push(tempShow);
	});
	
	//Sort from most viewed to least viewed
	showList.sort(function(a, b) {a.timesWatched, b.timesWatched})
	
	for(var i = 0; i < showList.length; i++) {
		console.log(showList[i].showTitle + ' '+ showList[i].timesWatched + ' '+ showList[i].lastWatched + ' '+ showList[i].imageUrl);
	}
	currentShows = showList;
	
}



function Show(index, showTitle, tmsId, seriesId, timesWatched, lastWatched, imageUrl) {
	this.index = index;
	this.showTitle = showTitle;
	this.tmsId = tmsId;
	this.timesWatched = timesWatched;
	this.lastWatched = lastWatched;
	this.imageUrl = imageUrl;
	this.seriesId = seriesId;
	
	//console.log(this.index + "  " + this.showTitle + "  " + this.timesWatched + "  " + this.lastWatched);

}
/*

function getChannels() {

	var reqUrl = 'http://data.tmsapi.com/v1/programs/SH014025350000/airings?lineupId=USA-NC32461-X&startDateTime=2013-09-21T00:00Z&includeDetail=true&api_key=1234567890';
	
	var listings = new XMLHttpRequest();
	
	listings.open('GET', reqUrl, true);
	listings.onload = function() {
			//do something with the JSON
			
		};
	listings.send();
	//var listing = new XMLHttpRequest();
	//GET http://data.tmsapi.com/v1/lineups?country=USA&postalCode=78701&api_key=<your key>
	
//	http://data.tmsapi.com/v1/programs/SH014025350000/airings?lineupId=USA-NC32461-X&startDateTime=2013-09-21T00:00Z&includeDetail=true&api_key=1234567890
}
*/

