var data = new Firebase('https://sieve-tvot.firebaseio.com');
var userData = data.child('Users');		
var userShows = userData.child('shows');


//logShow('Brady_Bunch', 5, 10);
	

function logShow(showTitle) {

	var alreadyListed = false;
	var snap;
	
	userShows.once('value', function (snapshot) {
	
		snap = snapshot;
		//console.log(showTitle);
		
		var showRef = snapshot.forEach(function (childSnapshot) {
			
		console.log('name' + childSnapshot.name());
			
		var childRef = childSnapshot.name();
			//console.log('name' +  childRef.name());
			if (showTitle == childSnapshot.child('showTitle').val()) {
				alreadyListed = true;	
				
				// Increment existing listing tally
				var timesWatched = childSnapshot.child('timesWatched').val();
				
				timesWatched++;
				userShows.child(childRef).update({timesWatched: timesWatched});
			}
		});
		console.log('done');

		// If not already created, create a listing for this show
		if(alreadyListed == false) {
			console.log('creating new listing!');
			// Create a new listing for the show
			userShows.push({showTitle: showTitle, timesWatched: 1});
		}
	})
}



