$(function(){

	var streamers = ["lirik", "freecodecamp", "pokket", "kindafunnygames", "DansGaming"]

	$('.twitch-btn').on('click', function(){
		checkStream();
	})

	var checkStream = function(){
		streamers.forEach(function(streamer){

			fetch('https://api.twitch.tv/kraken/streams/'+streamer+'?client_id=4told1vdrf3s0axfrd86lig9c4dawc')
			.then(checkStatus)
			.then(getJSON)
			.then(function(data){


				if (data.stream != null){
					$('.'+streamer+' + .live').append('Online');
					console.log(data.stream.game)
					$('.'+streamer+' ~ .game').html(data.stream.game)

				}
				else {
					$('.'+streamer+' + .live').html('Offline');
				}
			})
			.catch (function (err){
				console.log('ERROR',err)
			})

		})
	}


	function checkStatus (response){
		if (response.status === 200){
			return Promise.resolve(response);
		}
		else{
			return Promise.reject(new Error(response.statusText))
		}
	}

	function getJSON (response){
		return response.json();
	}

	checkStream();
 })

