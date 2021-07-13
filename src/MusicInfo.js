import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'

function MusicInfo ({albumArt, albumName, tracks, year, artist, artistURL, indexNumber, appleMusic, indexFunction}) {
    const fullStar = <FontAwesomeIcon icon={faStar} /> 
    const apple = <FontAwesomeIcon icon={faApple} />
    

    return (
        <li className="albumContainer">
            <img src={albumArt} alt={albumName} className="artAlbum"/> 
            <h2 className="nameAlbum">Album: {albumName}</h2>
            <h3 className="tracksAlbum">Track Count: {tracks}</h3>
            <h3 className="yearAlbum">Release Date: {year.slice(0,10)}</h3>
            <h3 className="artistAlbum">Artist: <a href={artistURL} target="_blank" rel="noreferrer">{artist}</a></h3>
            <h3 className="favorite" onClick={ () => {indexFunction(indexNumber)}} index={indexNumber}>Add to Favorites {fullStar}</h3>
            <h3 className="appleMusic">Listen on <a href={appleMusic} target="_blank" rel="noreferrer">Apple Music {apple}</a></h3>
        </li>
    )
}

export default MusicInfo;