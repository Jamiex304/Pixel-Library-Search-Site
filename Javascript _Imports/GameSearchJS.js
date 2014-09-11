//Game's search 
//Ref: http://www.giantbomb.com/api/documentation
$( document ).ready(function() {
    $('#GSearchButton').click( function() {
        $.ajax({
          url: "http://api.giantbomb.com/search/",
          type: "get",
            data: {api_key : "f0fc8f217ca6dfe296b4826056f07d73fdc27dc6", query: $('#GSearch').val(), resources : "game", field_list : "name,image", format : "jsonp", json_callback : "gamer1" },
          dataType: "jsonp"
        });
    });
	    window.gamer1 = function(data) {
              var table = '<table>';
              $.each( data.results.slice(0,30), function( key, value ) {
                  var image = "";
                  if (value.image) {
                      // either icon_url,medium_url,screen_url,small_url,super_ur,thumb_url or tiny_url
                      image = "<img src='"+value.image.thumb_url+"'/>";
                  }
                  table += '<tr><td>' + image + '</td><td td class="results-title"><h4>' + value.name + '</h4></td><td class="results-search-btn"><button class="search-btng" id="InfoButton">Check It Out</button></td></tr>';
              });
              table += '</table>';
              $('#GameResults').html(table);
        }
    
});

// When the more button is click this runs a search using the title of the movie it is next to  
$('.search-btng').live('click', '.search-btng', function() {
    getImdbInfoGame( $(this).closest('tr').find('.results-title').text());
	getYoutubeGame( $(this).closest('tr').find('.results-title').text()+"Official Trailer");
	getTwitch( $(this).closest('tr').find('.results-title').text());
	$("#GameTitleBar").hide();
	$("#GameResults").hide();
	document.getElementById( 'infoGame' ).style.display = 'block';
	document.getElementById( 'Comments' ).style.display = 'block';
});

//The function below takes the entered title and searchs imdb for a match then it displays as followed

function getImdbInfoGame(Title) {
    var url = "http://www.omdbapi.com/?t=" + Title + "&plot=full&tomatoes=true";
    $.ajax({
      url: url,
      cache: false,
      dataType: "jsonp",
      success: function(data) {

            var str = "";
			var strp = "";
			var strt = "";
			var strr = "";
			
            strt += "<h2><i>" + data.Title + "</i></h2><br />";
			strp += "<img src='" + data.Poster + "' /><br /><br />";
			
			str += "<center><h3>Plot</h3></center><hr><h4><b>" + data.Plot + "</b></h4><hr>";
            str += "<center><h3>Movie Details</h3></center><hr><b>Year :</b>" + data.Year + "<br />";
            str += "<b>Genre :</b>" + data.Genre + "<br />";
			str += "<b>Runtime :</b>" + data.Runtime + "<br />";
			str += "<b>Actors :</b>" + data.Actors + "<br /><br /><hr>";
			
			strr += "<center><h3>Our Review</h3></center><hr><h4><b></b></h4>";
			strr += "<b>What we say :</b> Great gameplay good game on all formats <br /><hr>";
			strr += "<b>The IMDB Rating :</b>" + data.imdbRating + "<br /><br />";
			strr += "<b>What it won :</b>" + data.Awards + "<br /><br />";
				
            $("#GameContent").html(str);
            $("#GamePoster").html(strp);
			$("#GameTitle").html(strt);
			$("#GameReview").html(strr);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
}
//Youtube Trailer get api fucntion
//Ref: http://www.codeproject.com/Articles/43403/YouTube-Dynamic-AJAX-JSON-Search-API-Demo
function getYoutubeGame(title){
$.ajax({
type: "GET",
url: yt_url='http://gdata.youtube.com/feeds/api/videos?q='+title+'&format=5&max-results=1&v=2&alt=jsonc',
dataType:"jsonp",
success: function(response)
{
if(response.data.items)
{
$.each(response.data.items, function(i,data)
{
var video_id=data.id;
var video_title=data.title;
var video_viewCount=data.viewCount;

var video_frame="<iframe width='800' height='415' src='http://www.youtube.com/embed/"+video_id+"' frameborder='0' type='text/html'></iframe>";

var final="<div id='title'>"+video_title+"</div><div>"+video_frame+"</div><div id='count'>"+video_viewCount+" Views</div>";
$("#GameYotubeTrailer").html(final);
});


}
else
{
$("#GameYotubeTrailer").html("<div id='no'>No Video</div>");
}
}

});

}

//Twitch Streams
//Ref: https://github.com/justintv/Twitch-API/blob/master/embedding.md
function getTwitch(title){
$.getJSON("https://api.twitch.tv/kraken/search/streams?q="+title+"&limit=20&type=top&callback=?", function (data) {
    var temp = "";

    $.each(data.streams.slice(0,5), function (index, item) {
        temp = temp + "<a target='frame1' href='http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + item.channel.name + "'><button>"+item.channel.display_name+"</button></a><br />";
    });
    $("#StreamList").html(temp);
});
}