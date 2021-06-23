import './App.css';
import { useState, useEffect } from 'react';

import Header from './Header';
import MusicInfo from './MusicInfo';
import FBFavs from './FBFavs';

import axios from 'axios';
import firebase from "./firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [album, setAlbum] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isActive, setActive] = useState("false");

  const removeButton = <FontAwesomeIcon icon={faTimes} /> 

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
      // console.log(apiRes);

      // Function to change returned 100x100 image to 600x600
      apiRes.map( (albumCover) => {
        const smallArt = albumCover.artworkUrl100;
        const largeArt = smallArt.replace("100x100bb.jpg", "600x600bb.jpg");
        return albumCover.artworkUrl100 = largeArt;
      })
  
      // If results found, set/fill the empty array of "album" with objects returned from api
      // If results not found, alert user to try again. 
      apiRes.length !== 0 ? 
        setAlbum(apiRes) : 
        alert(`No results found for "${searchInput}", please try again.`);
    })
  }

  // function that will set searchInput to user's search term
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  // const dbRef = firebase.database().ref();
  // function that will add album artwork to favorites
  const handleFirebase = (index) => {
    const dbRef = firebase.database().ref();
    dbRef.push({
      art: album[index].artworkUrl100,
      artist: album[index].artistName,
      album: album[index].collectionName,
    });
  }

  // Function to remove from FB
  const removeFirebase = (albumObject) => {
    const dbRef = firebase.database().ref();
    dbRef.child(albumObject).remove();
  }

  // Toggle Visibility
  const handleToggle  = () => {
    console.log(isActive);
    setActive(!isActive);
  }

  useEffect( () => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const pseudoFavorites = []
      // Object with key-value of saved items
      const data = response.val();
      // console.log(data);

      // gives separate key and album url value
      for (let key in data) {
        pseudoFavorites.push({key: key, fbInfo: data[key]})
        // console.log(pseudoFavorites);
      }
      setFavorites(pseudoFavorites);
    })
  }, []) 


  return (
    <div className="App">
      <Header 
        getDataFunction={getData}
        handleChangeFunction={handleChange}
        cartOfFav ={favorites.length}
        handleToggle ={handleToggle}
      />

      <main className="wrapper">

        <ul className={isActive ? "favCart" : "hidden"}>
          <h2 onClick={handleToggle} className="cartRemove">Your Favorites! {removeButton}</h2>
        {
          favorites.map((favorite, index) => {
            // console.log(favorite.key);
            return (
              <FBFavs 
                artFromFB={favorite.fbInfo.art}
                artistFromFB={favorite.fbInfo.artist}
                albumFromFB={favorite.fbInfo.album}
                keyFromFB={favorite.key}
                removeFB={removeFirebase}
                key={favorite.key+index}
              />
            )
          })
        }
        </ul>

        <ul>
        {
          // Mapping through each object in album
          album.map((albumInfo, index) => {
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
              indexNumber = {index}
              indexFunction = {handleFirebase}
              key={albumInfo.collectionId+index}
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