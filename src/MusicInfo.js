function MusicInfo ({albumArt, albumName, tracks, year, artist, artistURL,  explicit,  appleMusic}) {
    return (
        <li className="albumContainer">
            <img src={albumArt} alt={albumName} className="artAlbum"/> 
            <h2 className="nameAlbum">Album: {albumName}</h2>
            <h3 className="tracksAlbum">Track Count: {tracks}</h3>
            <h3 className="yearAlbum">Release Date: {year.slice(0,10)}</h3>
            <h3 className="artistAlbum">Artist: <a href={artistURL} target="_blank" rel="noreferrer">{artist}</a></h3>
            <h3 className="explicitAlbum">{explicit}</h3>
            <h3 className="appleMusic">Listen on <a href={appleMusic}>Apple Music</a></h3>
        </li>
    )
}

export default MusicInfo;