$(function(){

	var streamers = ["lirik", "freecodecamp", "pokket", "kindafunnygames", "GoldGlove", "DansGaming"]

	function checkStream(){

		streamers.forEach(function(streamer){

			fetch('https://api.twitch.tv/kraken/streams/'+streamer+'?client_id=4told1vdrf3s0axfrd86lig9c4dawc')
			.then(checkStatus)
			.then(getJSON)
			.then(function(data){


				if (data.stream != null){
					
					$('.'+streamer).html('<img class="img-responsive img-circle stream-logo" src="'+data.stream.channel.logo+'" /><a href="'+data.stream.channel.url+'">'+streamer+'</a>');
					$('.'+streamer+' + .live').html('Online');
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
	};


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

	$('.twitch-btn').on('click', function(){
		checkStream();
	})

	$('.all').on('click', function(){
	  $('li').removeClass('active')
	  var table, tr, i;
	  table = document.getElementById("myTable");
	  tr = table.getElementsByTagName("tr");

	  for (i = 0; i < tr.length; i++) {
	        tr[i].style.display = "";	      
	    }
	    $(this).addClass('active')
	})

	$('.online').on('click', function(){
		$('li').removeClass('active')
	  var input, filter, table, tr, td, i;
	  
	  filter = 'Online';
	  table = document.getElementById("myTable");
	  tr = table.getElementsByTagName("tr");

	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[1];
	    if (td) {
	      if (td.innerHTML.indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    } 
	}
	$(this).addClass('active')
	})

	$('.offline').on('click', function(){
		$('li').removeClass('active')
	  var input, filter, table, tr, td, i;
	  
	  filter = 'Offline';
	  table = document.getElementById("myTable");
	  tr = table.getElementsByTagName("tr");

	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[1];
	    if (td) {
	      if (td.innerHTML.indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    } 
	}
	$(this).addClass('active')
	})

	checkStream();
 })

