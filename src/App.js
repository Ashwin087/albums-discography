import './App.css';
import { useState } from 'react';
import axios from 'axios';
import MusicInfo from './MusicInfo';

function App() {

  const [album, setAlbum] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

  // Forwent useEffect since function will be triggered by form submission
  const getData = (event) => {
    event.preventDefault();
    axios({
      url: `https://itunes.apple.com/search`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        term: searchInput,
        country: 'CA',
        media: 'music',
        entity: "album"
      }
    }).then(returnedData => {
      // Storing path to array of objects containing album information
      const apiRes = returnedData.data.results;
      console.log(apiRes);

      // Function to change returned 100x100 image to 600x600
      apiRes.map( (albumCover) => {
        const smallArt = albumCover.artworkUrl100;
        const largeArt = smallArt.replace("100x100bb.jpg", "600x600bb.jpg");
        albumCover.artworkUrl100 = largeArt;
      })

      // Function to change "explicit" to parental advisory warning
      apiRes.map( (explicitWarning) => {
        const explicitPath = explicitWarning.collectionExplicitness;
        const advisory = require('./assets/advisory.png')
        console.log(advisory);
      })

      // If results found, set/fill the empty array of "album" with objects returned from api
      // If results not found, alert user to try again. 
      apiRes.length !== 0 ? setAlbum(apiRes) : alert(`No results found for "${searchInput}", please try again.`);
    })
  }

  // function that will set searchInput to user's search term
  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
  }

  return (
    <div className="App">
      <header className="wrapper"> 
        <h1>Artist Discography</h1>
        <h2 className="pageInfo">Search by Artist to Find All Their Work!</h2>
        {/* onSubmit, run function to make API call based on user input */}
        <form onSubmit={getData}>
          {/* sets value or searchInput to be user input by running handleChange function */}
          <label htmlFor="userSearch" className="sr-only">Search</label>
          <input type="text" name="userSearch" id="userSearch" placeholder="Search by Artist" onChange={handleChange}/>
          <button type="submit">Search</button>
        </form>
      </header>

      <main className="wrapper">
        <ul>
        {
          // Mapping through each object in album
          album.map((albumInfo) => {
            return (
              // Calling the "Albums" component. Passing in relevant information to display on page
              <MusicInfo 
              albumArt={albumInfo.artworkUrl100}
              albumName={albumInfo.collectionName}
              artist={albumInfo.artistName}
              year={albumInfo.releaseDate}
              tracks={albumInfo.trackCount}
              artistURL={albumInfo.artistViewUrl}
              appleMusic={albumInfo.collectionViewUrl}
              explicit={albumInfo.collectionExplicitness}
              key={albumInfo.collectionId}
              />
              );
            })}
        </ul>
      </main>

      <footer>
        <a className="juno" href="https://junocollege.com/">Copyright <span>&#169;</span> 2021 Juno College. Powered by iTunes API.</a>
      </footer>

    </div>
  );
}
export default App;