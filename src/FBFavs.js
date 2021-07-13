import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function FBFavs ({artFromFB, albumFromFB, keyFromFB, removeFB}) {
    const removeButton = <FontAwesomeIcon icon={faTimes} /> 
    
    return (
        <li className="favLi">
            <img src={artFromFB} alt={albumFromFB} className="favImg"/>
            <h2 className="favAlbum"> {albumFromFB} </h2>
            <h3 className="favRemove" onClick={() => {removeFB(keyFromFB)}}>{removeButton} </h3>
        </li>
    )
}

export default FBFavs;