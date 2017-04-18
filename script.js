$(document).ready(function(){
	var users=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
	var i=0;

	function getChannels(name){
		$.ajax({
			type: 'GET',
			url: 'https://wind-bow.gomix.me/twitch-api/channels/'+name,
			dataType: 'jsonp',
			success: function(data){
				if (data.display_name===undefined){
					document.querySelector(".content").insertAdjacentHTML('beforeend', "<div class='invalid'><div class='col-sm-6 name'><div class='logo'><img src='https://ecuador.travel/wp-content/uploads/2015/10/NoImage_592x444.jpg'></div>"+ name +"</div>"+ "<div class='col-sm-6 status'>Channel does not exist</div></div> <br>  <br>");
				} else {
					document.querySelector(".content").insertAdjacentHTML('beforeend', "<div class='offline'><a href='https://www.twitch.tv/"+name+"' target='_blank'><div class='col-sm-6 name'><div class='logo'><img src='"+data.logo+"' alt='Image not found'onerror=\"this.onerror=null;this.src='https://ecuador.travel/wp-content/uploads/2015/10/NoImage_592x444.jpg';\" /> </div>"+data.display_name +"</div></a>"+ "<div class='col-sm-6 status'>Offline</div></div> <br>  <br>");
				} //end if
			} 
		}); //end ajax
	} //end getChannels

	function getStreams(name){
		$.ajax({
			type: 'GET',
			url: 'https://wind-bow.gomix.me/twitch-api/streams/'+name,
			dataType: 'jsonp',
			success: function(data){

				if (data.stream===null){
					getChannels(name);
				} else {
					document.querySelector(".content").insertAdjacentHTML('beforeend', "<div class='online'><a href='https://www.twitch.tv/"+name+"' target='_blank'><div class='col-sm-6 name'> ONLINE <div class='logo'><img src='"+data.stream.channel.logo+"' alt='Image not found'onerror=\"this.onerror=null;this.src='https://ecuador.travel/wp-content/uploads/2015/10/NoImage_592x444.jpg';\" /></div> "+data.stream.channel.display_name +"</div></a>" + "<div class='col-sm-6 status'>"+data.stream.channel.game+" "+data.stream.channel.status+"</div></div> <br> <br>");							
				}	//end if else			
			}
		}); //end ajax
	} //end getStreams

	while (i<users.length){
		var user=users[i];
		getStreams(user);
		i++;

	} //end while

	
	
	$("li").click(function(){
		var myId=$(this).attr("id");
		var offlines = document.getElementsByClassName('offline');
		var invalids = document.getElementsByClassName('invalid');
		var onlines = document.getElementsByClassName('online');
		$(this).css("color", "red");

		switch (myId){
			case 'all':
				$(onlines).show();
				$(offlines).show();
				$(invalids).show();
				break;
			case 'online':
				$(onlines).show();
				$(offlines).hide();
				$(invalids).hide();
				break;
			case 'offline':
				$(onlines).hide();
				$(offlines).show();
				$(invalids).hide();
				break;
			case 'invalid':
				$(onlines).hide();
				$(offlines).hide();
				$(invalids).show();
				break;
		} //end switch
		
	}); //end click


});