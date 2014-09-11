//Everything Search
//Ref: Ref sources in MoviesJS,TvshowsJS and GamesJS
$(document).ready(function() {
    var url = 'http://api.themoviedb.org/3/',
    mode = 'search/movie',
    input,
    movieName,
    key = '?api_key=caa54d9ae5b5cd0d92f42cc9d0f8f759';

    $('#ESearchButton').click(function() {
        var input = $('#ESearch').val(),
            movieName = encodeURI(input);
        $.ajax({
            url: url + mode + key + '&query='+movieName ,
            dataType: 'jsonp',
            success: function(data) {
			
        var table = '<table>';
        $.each( data.results, function( key, value ) {
          table += '<tr><td class="results-img"><img src="http://image.tmdb.org/t/p/w500' + value.poster_path +'" alt="" width="150" height="200"></td><td class="results-title"><h4>' + value.original_title + '</h4></td><td class="results-search-btn"><button class="search-btnm" id="InfoButton">Check It Out</button></td></tr>';
        });
                    
    if($('#pref1select').val() === "M") {
        $('#pref1').html(table);
    }
    if($('#pref2select').val() === "M") {
        $('#pref2').html(table);
    }
    if($('#pref3select').val() === "M") {
        $('#pref3').html(table);
    }
            }
        });
    });
});
//These function assign the title of the show you want to the button 
$('.search-btnm').live('click', '.search-btnm', function() {
    getImdbInfoMovie( $(this).closest('tr').find('.results-title').text());
	getYoutubeMovie( $(this).closest('tr').find('.results-title').text()+"Official Trailer");
	$("#container").hide();
	document.getElementById( 'infoMovies' ).style.display = 'block';
	document.getElementById( 'Comments' ).style.display = 'block';
});

//The function below takes the selected title and searchs omdb for a match then it displays as followed a more detailed reported

function getImdbInfoMovie(Title) {
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
			strr += "<b>What we say :</b>" + data.tomatoConsensus + "<br /><hr>";
			strr += "<b>The IMDB Rating :</b>" + data.imdbRating + "<br /><br />";
			strr += "<b>The Tomato Rating :</b>" + data.tomatoRating + "<br /><br />";
			strr += "<b>Where it ranks on the tomato scale :</b>" + data.tomatoMeter + "/100<br /><br />";
			strr += "<b>What it won :</b>" + data.Awards + "<br /><br />";
			strr += "<b>What it made at the box office :</b>" + data.BoxOffice + "<br /><br />";
				
            $("#MovieContent").html(str);
            $("#MoviePoster").html(strp);
			$("#MovieTitle").html(strt);
			$("#MovieReview").html(strr);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
}

//Youtube Function for the video
function getYoutubeMovie(title){
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
$("#MovieYotubeTrailer").html(final);
});


}
else
{
$("#MovieYotubeTrailer").html("<div id='no'>No Video</div>");
}
}

});

}

// tv show search
$(document).ready(function() {
    var url = 'http://api.themoviedb.org/3/',
    mode = 'search/tv',
    input,
    movieName,
    key = '?api_key=caa54d9ae5b5cd0d92f42cc9d0f8f759';

    $('#ESearchButton').click(function() {
        var input = $('#ESearch').val(),
            movieName = encodeURI(input);
        $.ajax({
            url: url + mode + key + '&query='+movieName ,
            dataType: 'jsonp',
            success: function(data) {
			
        var table = '<table>';
        $.each( data.results, function( key, value ) {
          table += '<tr><td class="results-img"><img src="http://image.tmdb.org/t/p/w500' + value.poster_path +'" alt="" width="150" height="200"></td><td class="results-title"><h4>' + value.original_name + '</h4></td><td class="results-search-btn"><button class="search-btnt" id="InfoButton">Check It Out</button></td></tr>';
        });
                    
    if($('#pref1select').val() === "T") {
        $('#pref1').html(table);
    }
    if($('#pref2select').val() === "T") {
        $('#pref2').html(table);
    }
    if($('#pref3select').val() === "T") {
        $('#pref3').html(table);
    }
            }
        });
    });
});
$('.search-btnt').live('click', '.search-btnt', function() {
    getImdbInfotv( $(this).closest('tr').find('.results-title').text());
	getYoutubetv( $(this).closest('tr').find('.results-title').text()+"Trailer");
	$("#container").hide();
	document.getElementById( 'infoTV' ).style.display = 'block';
	document.getElementById( 'Comments' ).style.display = 'block';
});

//The function below takes the selected title and searchs omdb for a match then it displays as followed

function getImdbInfotv(Title) {
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
			strr += "<b>What we say :</b> Good Plot line great effects. The actors make their roles there own<br /><hr>";
			strr += "<b>The IMDB Rating :</b>" + data.imdbRating + "<br /><br />";
			strr += "<b>What it won :</b>" + data.Awards + "<br /><br />";
				
            $("#TVContent").html(str);
            $("#TVPoster").html(strp);
			$("#TVTitle").html(strt);
			$("#TVReview").html(strr);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
}

//Youtube Function for the video
function getYoutubetv(title){
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
$("#TVYotubeTrailer").html(final);
});


}
else
{
$("#TVYotubeTrailer").html("<div id='no'>No Video</div>");
}
}

});

}

//Games
$( document ).ready(function() {
    $('#ESearchButton').click( function() {
        $.ajax({
          url: "http://api.giantbomb.com/search/",
          type: "get",
            data: {api_key : "f0fc8f217ca6dfe296b4826056f07d73fdc27dc6", query: $('#ESearch').val(), resources : "game", field_list : "name,image", format : "jsonp", json_callback : "gamer" },
          dataType: "jsonp"
        });
    });
	    window.gamer = function(data) {
              var table = '<table>';
              $.each( data.results.slice(0,30), function( key, value ) {
                  var image = "";
                  if (value.image) {
                      // either icon_url,medium_url,screen_url,small_url,super_ur,thumb_url or tiny_url
                      image = "<img src='"+value.image.thumb_url+"'/>";
                  }
                  table += '<tr><td>' + image + '</td><td td class="results-title"><h4>' + value.name + '</h4></td><td class="results-search-btn"><button class="search-btng" id="InfoButton">Check It Out</button></td></tr>';
              });
    if($('#pref1select').val() === "G") {
        $('#pref1').html(table);
    }
    if($('#pref2select').val() === "G") {
        $('#pref2').html(table);
    }
    if($('#pref3select').val() === "G") {
        $('#pref3').html(table);
    }
        }
    
});

// When the more button is click this runs a search using the title of the movie it is next to  
$('.search-btng').live('click', '.search-btng', function() {
    getImdbInfoGame( $(this).closest('tr').find('.results-title').text());
	getTwitch( $(this).closest('tr').find('.results-title').text());
	getYoutubeGame( $(this).closest('tr').find('.results-title').text()+"Official Trailer");
	$("#container").hide();
	document.getElementById( 'infoGame' ).style.display = 'block';
	document.getElementById( 'Comments' ).style.display = 'block';
});

//The function below takes the entered title and searchs imdb for a match then it displays as followed

function getImdbInfoGame(Title, pref) {
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
function getTwitch(title){
$.getJSON("https://api.twitch.tv/kraken/search/streams?q="+title+"&limit=20&type=top&callback=?", function (data) {
    var temp = "";

    $.each(data.streams.slice(0,5), function (index, item) {
        temp = temp + "<a target='frame1' href='http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + item.channel.name + "'><button>"+item.channel.display_name+"</button></a><br />";
    });
    $("#StreamList").html(temp);
});
}

    