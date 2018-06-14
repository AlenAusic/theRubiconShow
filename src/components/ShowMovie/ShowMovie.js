import React from 'react';
import '../../App.css';
import './ShowMovie.css';
import Button from 'react-bootstrap/lib/Button';
import { NavLink } from 'react-router-dom';
import YouTube from 'react-youtube';
import movie from '../MovieRow/MovieRow';
import axios from 'axios';
// import $ from 'jquery';



class ShowMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieID: movie.id,
            youtubeKey: null
        };

        this.onClick = this.onClick.bind(this);


        // ---------------------- jQuery AJAX -------------------


        // Somehow I couldn't concatenate url for API call even though I tried using axios, which works
        // like you can see below: if I enter 24428 as a movie ID, I get what I need (YouTube Key) which
        // is then passed to react-youtube. Trailer is displayed as intended.                      :sad:

        // UPDATE: After whole day of researching, it seems like passing variables in URL is not allowed
        // Thumbs down to axios, I've had more succes with jQuery, but I don't have enough time.   :sad:
        // LINK: https://github.com/axios/axios/issues/706

        // axios.get(`https://api.themoviedb.org/3/movie/` + state.movieID + `/videos?api_key=1b5adf76a72a13bad99b8fc0c68cb085`)

        axios.get(`https://api.themoviedb.org/3/movie/24428/videos?api_key=1b5adf76a72a13bad99b8fc0c68cb085`)
        .then((res) => {
            console.log(res);
            const ytKey = res.data.results["0"].key; 
            this.setState({youtubeKey: ytKey});
        })
    }

    onClick() {
        window.location.href = `mailto:alenausic@outlook.com`;
    }


    render() {

        const opts = {
            /* height: '400',
            width: '1000', */
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        };


        return (
            <div className="App">
                <h2 className="Sorry">App supports only screens wider than 910px!</h2>
                <table className="titleBar">
                    <tbody>
                        <tr>
                            <td className="left">
                                <NavLink to="/">
                                <img alt="Back Arrow" width="30" src="../../left-arrow.svg" />
                                </NavLink>
                            </td>
                            <td width="8"/>
                            <td className="nav">
                                Back
                            </td>
                                
                            <td className="buttonStyle">
                            <Button className="mailme" onClick={this.onClick}>Job worthy? :)</Button>
                            </td>
                        </tr>
                        
                        
                        
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <YouTube 
                                    videoId = {this.state.youtubeKey}
                                    
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h3>Description: </h3>
                                <p>{this.state.youtubeKey}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ShowMovie;