function showDetails(){
    document.getElementById("details").style.color="white";
    document.getElementById("details").style.fontSize="20px";
    // movietitle=document.getElementById("movietitle").value;
    movietitle = sessionStorage.getItem("movietitle")
    var search_header_div = document.getElementById("search_header");
    search_header_div.innerHTML += "<br/>"+"Search results for \""+movietitle+"\":";
    // document.getElementById("details").innerHTML=movietitle;
    httpRequest=new XMLHttpRequest();
    API_KEY="e0ff26e4";
    url="http://www.omdbapi.com/?apikey="+API_KEY+"&s="+movietitle;
    httpRequest.open("GET",url);
    httpRequest.send();
    httpRequest.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            movie_data=JSON.parse(this.responseText);
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
                        // details_div.style.color="blue";
                        mv_data=JSON.parse(this.responseText);
                        // details_div.innerHTML += "<p>"+this.id+"<p>";
                        id=this.id;
                        poster=mv_data.Poster;
                        title=mv_data.Title;
                        year=mv_data.Year;
                        writer=mv_data.Writer;
                        runtime=mv_data.Runtime;
                        genre=mv_data.Genre;
                        plot=mv_data.Plot;
                        // details_div.innerHTML += "<div class=\"moviecard\" id=\""+id+"\"><div class=\"poster\" id=\"poster"+id+"\"></div><div class=\"moviename\" id=\"moviename"+id+"\">"+title+"</div></div>";
                        

                        details_div.innerHTML += "<img id=\"poster"+id+"\" src=\""+poster+"\" class=\"poster\" alt = \""+title+"\" title = \""+title+"\"><span class=\"moviename\">&nbsp; "+title+"</span><br/><br/>";
                    }
                }
            }
        }
    }
}

function setItemInSession(){
    sessionStorage.setItem("movietitle",document.getElementById("movietitle").value);
    location.href = "movies.html";
}