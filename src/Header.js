import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Header ({getDataFunction, handleChangeFunction, cartOfFav, handleToggle}) {
    const fullStar = <FontAwesomeIcon icon={faStar} /> 

    return (
        <header className="wrapper">
            <h1>Artist Discography</h1>
            <h2 className="favButton" onClick={handleToggle}> {fullStar} {cartOfFav}</h2>
            <h2 className="pageInfo">Search by Artist to Find All Their Work!</h2>

            {/* onSubmit, run function to make API call based on user input */}
            <form onSubmit={getDataFunction}>
            {/* sets value or searchInput to be user input by running handleChange function */}
                <label htmlFor="userSearch" className="sr-only">Search</label>
                <input type="text" name="userSearch" id="userSearch" placeholder="Search by Artist" onChange={handleChangeFunction}/>
                <button type="submit">Search</button>
            </form>
        </header>
    )
}

export default Header;