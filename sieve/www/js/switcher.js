var changeChannel = function(channel){

			var channelDestiniation = channel;
			var ipAddress = "172.16.8.18:8080";


			var url = "http://" + ipAddress + "/tv/tune?major=" + channelDestiniation;

			$.get(url, {}, function(result){

			});

		}



		// given seriesID, go to channel

		// pass channel in here
		
		//changeChannel(1);