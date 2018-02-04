$(function() {
  var streamers = [
    "lirik",
    "freecodecamp",
    "pokket",
    "ESL_SC2",
    "kindafunnygames",
    "GoldGlove",
    "DansGaming",
    "sacriel"
  ];


  function checkStream() {

    streamers.forEach(function(streamer) {

      $('.stream-details').append('<tr><td class="'+streamer+'"></td><td class="status"></td><td class="game"></td></tr>');

      fetch(
        "https://wind-bow.glitch.me/twitch-api/channels/" +
          streamer
      )
      .then(checkStatus)
      .then(getJSON)
      .then(function(data) {

          $("." + streamer).html(
            '<img class="img-responsive img-circle stream-logo" src="'+data.logo+'"/><a href="http://twitch.tv/"'+streamer+'">'+streamer+'</a>'
          );


      })
      .catch(function(err) {
        console.log("ERROR", err);
      });
  });
    
    streamers.forEach(function(streamer) {
      fetch(
        "https://api.twitch.tv/kraken/streams/" +
        streamer +
        "?client_id=4told1vdrf3s0axfrd86lig9c4dawc"
      )
        .then(checkStatus)
        .then(getJSON)
        .then(function(data) {
          if (data.stream != null) {
            $("." + streamer + " + .status").html(
              '<img class="img-responsive status-icon" src="img/online.png" alt="Stream online">Online'
            );
            $("." + streamer + " ~ .game").html(data.stream.game);
          } else {
            $("." + streamer + " + .status").html("Offline");
          }
        })
        .catch(function(err) {
          console.log("ERROR", err);
        });
    });
  }

  function checkStatus(response) {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function getJSON(response) {
    return response.json();
  }

  $(".all").on("click", function() {
    $("li").removeClass("active");
    var table, tr, i;
    table = document.getElementById("stream");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      tr[i].style.display = "";
    }
    $(this).addClass("active");
  });

  $(".online").on("click", function() {
    $("li").removeClass("active");
    var input, filter, table, tr, td, i;

    filter = "Online";
    table = document.getElementById("stream");
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
    $(this).addClass("active");
  });

  $(".offline").on("click", function() {
    $("li").removeClass("active");
    var input, filter, table, tr, td, i;

    filter = "Offline";
    table = document.getElementById("stream");
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
    $(this).addClass("active");
  });

  $("#search-input").on("keyup", function() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("stream");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });

  
  checkStream();
});
