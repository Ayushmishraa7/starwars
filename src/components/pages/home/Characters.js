import React, { Fragment, useContext } from 'react'
import './Characters.css'
import { Search } from './Search'
import { Spinner } from '../../layout/Spinner'
import { Pagination } from '../../pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import yoda from '../../icons/baby-yoda.svg'
import DataContext from '../../context/dataContext'
import ReactTooltip from 'react-tooltip'

export const Characters = () => {
  const dataContext = useContext(DataContext)
  const { characters, loading, buttonKey, setButtonKey, characterSearchError } = dataContext

  if (loading) {
    return <Spinner />
  } else {
    return (
    <Fragment>
      <Search />
      {characterSearchError === true &&
        <div className='search-error'>
          <h3>Sorry, no such character, there is... Try again, please!</h3>
          <img src={yoda} alt='yoda' id='yoda-icon' />
        </div>
      }
      <Fragment>
        {characters.map((character, index) => (
          <div key={index} className='character'>
            <div className='character-info'>
              <div className='character-info-header'>
                <h3>{character.name}</h3>
                <div>
                  <button className='add-button' data-tip='Add to favourites'>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    className='details-button'
                    data-tip='Show details'
                    onClick={() => {
                      setButtonKey(character.created)
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                </div>
              </div>
              <div className={buttonKey === character.created ? 'character-info-details-active' : 'character-info-details'}>
                <span><strong>Height: </strong><p>{character.height} cm</p></span>
                <span><strong>Mass: </strong><p>{character.mass} kg</p></span>
                <span><strong>Hair color: </strong><p>{character.hair_color}</p></span>
                <span><strong>Birth year: </strong><p>{character.birth_year}</p></span>
                <span><strong>Gender: </strong><p>{character.gender}</p></span>
              </div>
            </div>
            <ReactTooltip place='left' effect='solid' type='info' />
          </div>
        ))}
      </Fragment>
      <Pagination />
    </Fragment>
    )
  }
}
