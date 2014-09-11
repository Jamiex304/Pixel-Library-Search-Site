//Tv Search function shows all results under that title
//Ref: http://docs.themoviedb.apiary.io/
$(document).ready(function() {
    var url = 'http://api.themoviedb.org/3/',
    mode = 'search/tv',
    input,
    tvName,
    key = '?api_key=caa54d9ae5b5cd0d92f42cc9d0f8f759';

    $('#TSearchButton').click(function() {
        var input = $('#TSearch').val(),
            tvName = encodeURI(input);
        $.ajax({
            url: url + mode + key + '&query='+tvName,
            dataType: 'jsonp',
            success: function(data) {
			
        var table = '<table>';
        $.each( data.results, function( key, value ) {
          table += '<tr><td class="results-img"><img src="http://image.tmdb.org/t/p/w500' + value.poster_path +'" alt="" width="150" height="200"></td><td class="results-title"><h4>' + value.original_name + '</h4></td><td class="results-search-btn"><button class="search-btnt" id="InfoButton">Check It Out</button></td></tr>';
        });
        $('#TVResults').html(table);
            }
        });
    });
});

$('.search-btnt').live('click', '.search-btnt', function() {
    getImdbInfotv( $(this).closest('tr').find('.results-title').text());
	getYoutubetv( $(this).closest('tr').find('.results-title').text()+"Trailer");
	$("#TVTitleBar").hide();
	$("#TVResults").hide();
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
