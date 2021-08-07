
function setItemInSession(){
    sessionStorage.setItem("movietitle",document.getElementById("movietitle").value);
    location.href = "movies.html";
}
function show_movie_details(id){
    console.log(id);
}
function showDetails(){
    movietitle = sessionStorage.getItem("movietitle")
    var search_header_div = document.getElementById("search_header");
    search_header_div.innerHTML += "<br/>"+"Search results for \""+movietitle+"\":";
    movies = [];
    httpRequest=new XMLHttpRequest();
    API_KEY="e0ff26e4";
    url="http://www.omdbapi.com/?apikey="+API_KEY+"&s="+movietitle;
    httpRequest.open("GET",url);
    httpRequest.send();
    httpRequest.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            movie_data=JSON.parse(this.responseText);
            idx = 0;
            for (var i = 0; i < movie_data.Search.length; i++) {
                movie_title=movie_data.Search[i].Title;
                imdbID=movie_data.Search[i].imdbID;
                movie_url="http://www.omdbapi.com/?apikey="+API_KEY+"&i="+imdbID;
                httpRequest2=new XMLHttpRequest();
                httpRequest2.id=imdbID;
                httpRequest2.open("GET",movie_url);
                httpRequest2.send();
                httpRequest2.onreadystatechange=function(){
                    if(this.readyState==4&&this.status==200){
                        var details_div = document.getElementById("details");
                        mv_data=JSON.parse(this.responseText);
                        id=this.id;
                        poster=mv_data.Poster;
                        title=mv_data.Title;
                        year=mv_data.Year;
                        writer=mv_data.Writer;
                        runtime=mv_data.Runtime;
                        genre=mv_data.Genre;
                        plot=mv_data.Plot;
                        var movie_dict = {
                            'id': id,
                            'poster': poster,
                            'title': title,
                            'year': year,
                            'writer': writer,
                            'runtime': runtime,
                            'genre': genre,
                            'plot': plot
                        };
                        movies[idx] = movie_dict;
                        idx += 1;
                        row_string='<a class=\"movie\" id=\"a'+id+'\" onclick=\"show_movie_details(this.id)\"><div class = \"card\"><img class = \"movie-image\" src = \"' + poster + '\" alt = \"' + title + '\" style=\"width:100%\" onerror=\"this.onerror=null;this.src=\'images/notavailable.jpg\';\"><div class = \"container\"><h4><b>' + title + '</b></h4><p> Writer: ' + writer + '</p></div></div></a>';
                        details_div.innerHTML += row_string;
                    }
                }
            }
        }
    }
}
