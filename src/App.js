/* ---------- [ REACT ] ----------- */
import React, { Component } from 'react';
/* ---------- [ CSS ] ----------- */
import './App.css';
/* ---------- [ COMPONENTS ] ----------- */
import MovieRow from './components/MovieRow/MovieRow';
import Error from './components/Error/Error';
import ShowMovie from './components/ShowMovie/ShowMovie';
/* ---------- [ LIBRARIES ] ----------- */
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import { BrowserRouter, Route, Switch} from 'react-router-dom';



class App extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      stateOfUrl: "movie"
    };


    this.onClick = this.onClick.bind(this);


    this.performSearch("avengers");
  }

  // SEARCH METHOD USING TMDB API KEY
  performSearch(searchTerm) {

    let urlString = "https://api.themoviedb.org/3/search/" + this.state.stateOfUrl + "?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm;
    // let urlPopular = "https://api.themoviedb.org/3/" + this.state.stateOfUrl + "/popular?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page=1&include_adult=false";
    
    
    $.ajax({
      url: urlString,
      // SUCCESS
      success: (searchResults) => {
        console.log("Fetched data successfully");

        const results = searchResults.results;

        var movieRows = [];

        results.forEach((movie) => {

          if (movie.poster_path !== null) {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
            
            const movieRow = <MovieRow key={movie.id} movie={movie}/>;
          
            movieRows.push(movieRow);   
          }
          
        })

        if (searchTerm.length >= 3) {
          this.setState({rows: movieRows});
        } 
        
        /* if (searchTerm === "avengers") {
          $.ajax({
            url: "https://api.themoviedb.org/3/search/" + this.state.stateOfUrl + "?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page=1&include_adult=false",
            
            success: (res) => {
                console.log(res);
                this.setState({stateOfUrl: this.url});
                
          },
        });   */
        

        
      },
      // ERROR
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    })
  }

  // SEARCH CHANGE HANDLER 
  searchChangeHandler(event) {
    // LOG CURRENT STATE OF INPUT FIELD
    console.log(event.target.value);

    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  

  // SET API URL TO TV SHOWS
  urlToTV = (event) => {
    function reRenderMoviesList() {
      document.getElementById("inputField").click();
    };

    this.setState({ stateOfUrl: "tv" });
    reRenderMoviesList();
  };

  // SET API URL TO MOVIES
  urlToMovie = () => {
    function reRenderMoviesList() {
      document.getElementById("inputField").click();
    };
    
    this.setState({ stateOfUrl: "movie" });
    reRenderMoviesList();
  }

  // MAILTO ONCLICK METHOD
  onClick() {
    window.location.href = `mailto:alenausic@outlook.com`;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={
            () => {
              return (
                <div className="App"> 
                  <h2 className="Sorry">App supports only screens wider than 910px!</h2>   
                  <table className="titleBar">
                    <tbody>
                      <tr>
                        <td className="left">
                          <img alt="Rubicon Logo" width="50" src="logo.jpg"/>
                        </td>
                        <td width="8"/>
                        <td className="buttonStyle">
                          <Button id="toMovies" onClick={this.urlToMovie} onMouseEnter={this.urlToMovie}>Movies</Button>
                          <Button id="toTV" onClick={this.urlToTV} onMouseEnter={this.urlToTV}>TV Shows</Button>
                          <Button className="mailme" onClick={this.onClick}>Job worthy? :)</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <span>
                    <input id="inputField" type="text" style={{
                      fontSize: 24,
                      display: 'block',
                      width: '70%',
                      minWidth: '800',
                      marginLeft: '15%',
                      marginRight: '15%',
                      paddingTop: 8,
                      paddingBottom: 8,
                      paddingLeft: 16,
                      border: '1px #404040 solid'
                    }} onChange={this.searchChangeHandler.bind(this)} onClick={this.searchChangeHandler.bind(this)} placeholder="Enter search term..."/>
                  
                    {this.state.rows}
                  </span>
                </div>

              )
            }
          }/>

          <Route path="/movie/" strict component={ShowMovie} />

          {/* <Route path="/movie/" render={
            ()=><ShowMovie render={data => (
                  <h1>Hello {this.movie.id}</h1>
                )}/>
            }
          /> */}

          <Route component={Error} />
          
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default App;
