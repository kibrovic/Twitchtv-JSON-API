$(document).ready(function(){
	var users=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
	var i=0;

	function getChannels(name){
		$.ajax({
			type: 'GET',
			url: 'https://wind-bow.gomix.me/twitch-api/channels/'+name,
			dataType: 'jsonp',
			success: function(data){
					document.querySelector(".content").insertAdjacentHTML('beforeend', "<div class='col-sm-4 name'>"+data.display_name +"</div>"+ "<div class='col-sm-6 status'>"+data.game+" "+data.status+"</div>" +" <br> " + JSON.stringify(data)+" <br>  <br>");
			}
		});
	}

	function getStreams(name){
		$.ajax({
			type: 'GET',
			url: 'https://wind-bow.gomix.me/twitch-api/streams/'+name,
			dataType: 'jsonp',
			success: function(data){

				if (data.stream===null){
					getChannels(name);
				} else {
					document.querySelector(".content").insertAdjacentHTML('beforeend', "<div class='col-sm-4 name'> ONLINE"+data.stream.channel.display_name +"</div>" + "<div class='col-sm-6 status'>"+data.stream.channel.game+" "+data.stream.channel.status+"</div>" +" <br> <br>");							
				}				
			}
		});
	}

	while (i<users.length){
		var user=users[i];
		getStreams(user);
		i++;

	}
 
 //Just take what's needed
	


});