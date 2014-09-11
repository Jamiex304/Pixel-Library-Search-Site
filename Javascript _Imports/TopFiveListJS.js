//Box office Top Five
//Ref: http://docs.themoviedb.apiary.io/
$(document).ready(function() {
    var url = 'http://api.themoviedb.org/3/',
    mode = 'movie/now_playing',
    key = '?api_key=caa54d9ae5b5cd0d92f42cc9d0f8f759';
	
        var input = $('#titlesearch').val(),
            movieName = encodeURI(input);
        $.ajax({
            url: url + mode + key + '&query='+movieName,
            dataType: 'jsonp',
            success: function(data) {
			
        var table = '<table>';
        $.each( data.results.slice(0,5), function( key, value ) {
          table += '<td class="results-img"><img src="http://image.tmdb.org/t/p/w500' + value.poster_path +'" alt="" width="130" height="150"></td>';
        });
        $('#TopListMovie').html(table);
            }
        });
    
});

//Popular tv shows Tv shows 
$(document).ready(function() {
    var url = 'http://api.themoviedb.org/3/',
    mode = 'tv/popular',
    key = '?api_key=caa54d9ae5b5cd0d92f42cc9d0f8f759';

        var input = $('#titlesearch').val(),
            tvName = encodeURI(input);
        $.ajax({
            url: url + mode + key + '&query='+tvName,
            dataType: 'jsonp',
            success: function(data) {
			
        var table = '<table>';
        $.each( data.results.slice(0,5), function( key, value ) {
          table += '<td class="results-img"><img src="http://image.tmdb.org/t/p/w500' + value.poster_path +'" alt="" width="130" height="150"></td>';
        });
        $('#TopListTV').html(table);
            }
        });
});