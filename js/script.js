function getValuesFromInputs() {
    var movie = {
        title: $('input[name=title]').val(),
        year: $('input[name=year]').val()
    };

    return movie;
}

function disableSearch() {
    $('button').text('Searching...');
    $('button').attr('disabled', 'disabled');
}

function enableSearch() {
    $('button').text('Search!').removeAttr('disabled');
}

function writeMovieToDOM(movie) {
    $('.title').text(movie.Title);
    $('img').attr('src', movie.Poster);
    $('.year').text(movie.Year);
    $('.rated').text(movie.Rated);
    $('.released').text(movie.Released);
    $('.runtime').text(movie.Runtime);
    $('.genre').text(movie.Genre);
    $('.director').text(movie.Director);
    $('.writer').text(movie.Writer);
    $('.actors').text(movie.Actors);
    $('.plot').text(movie.Plot);
    $('.language').text(movie.Language);
    // $('.country').text(movie.Country);
    // $('.awards').text(movie.Awards);
    // $('.metascore').text(movie.Metascore);
    // $('.imdbrating').text(movie.imdbRating);
    // $('.imdbvotes').text(movie.imdbVotes);
}

function searchMovie(name) {
    $.ajax({
        url: 'http://www.omdbapi.com/?t=' + name + '&plot=full&r=json',
        method: 'GET',
        dataType: 'JSON',
        success: function(movie) {
            if (movie.Error) {
                setTimeout(function () {
                    alert('The movie you have searched has not been found');
                    $('button').text('Search!');
                    $('#movie').hide();
                }, 3000);
            } else {
                enableSearch();
                writeMovieToDOM(movie);
            }
        }
    });
}

function fetchMovie() {
    var movie = getValuesFromInputs();
    disableSearch();
    searchMovie(movie.title);
    $('input[name=title]').val('');
    $('input[name=year]').val('');
}

$('button').on('click', fetchMovie);

/*$('button').on('click', function () {
    var movie = {
        title: $('input[name=title]').val(),
        year: $('input[name=year]').val()
    };

    $('button').text('Searching...');
    $('button').attr('disabled', 'disabled');
    $('button').css('color', 'black');

    $.ajax({
        url: 'http://www.omdbapi.com/?t=' + movie.title + '&y=&plot=short&r=json',
        method: 'GET',
        data: 'json',
        success: function(response) {
            var movie = JSON.parse(response);

        }
    });
});*/

/*var Cinema = {
    getValuesFromInputs: function() {
        var movie = {
            title: $('input[name=title]').val(),
            year: $('input[name=year]').val()
        };

        return movie;
    },

    disableSearch: function() {
        $('button').text('Searching...').attr('disabled', 'disabled');
    },

    enableSearch: function() {
        $('button').text('Search').removeAttr('disabled');
    },

    writeMovieToDOM: function(movie) {
        $('.title').text(movie.Title);
        $('.actors').text(movie.Actors);
        $('.director').text(movie.Director);
        $('img').attr('src', movie.Poster) ;
    },

    searchMovie: function(name) {
        return $.getJSON('http://www.omdbapi.com', {t: name, plot: 'full', r: 'json'});
    },

    fetchMovie: function() {
        var movie = this.getValuesFromInputs();
        this.disableSearch();

        this.searchMovie(movie.title).then(function(movie) {
            that.enableSearch();
            that.writeMovieToDOM(movie);
        });
    }
};*/

// $('button').on('click', $.proxy(Cinema.fetchMovie, Cinema));