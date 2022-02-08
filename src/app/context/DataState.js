import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import DataContext from './dataContext'

export const DataState = ({ children }) => {
  //  characters data from API & from user search
  const [characters, setCharacters] = useState([])
  //  character details data
  const [characterDetails, setCharacterDetails] = useState([])
  //  number of characters found
  const [charactersCount, setCharactersCount] = useState()
  //  current data page
  const [currentPage, setCurrentPage] = useState(1)
  //  state of a loading spinner
  const [loading, setLoading] = useState(false)
  //  state of a button showing character's details
  const [buttonKey, setButtonKey] = useState('')
  //  set API for a pagination
  const [api, setApi] = useState('https://swapi.dev/api/people/?page=')
  //  input value for a pagination
  const [inputValue, setInputValue] = useState()
  //  message if the searched character doesn't exist
  const [characterSearchError, setCharacterSearchError] = useState(false)
  //  does not display data when loading
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  //  fetching data from API
  const getData = (api, pageNumber) => {
    setLoading(true)
    setDisplay(false)
    fetch(`${api}${pageNumber}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setDisplay(true)
        setCharacters(data.results)
        setCurrentPage(pageNumber)
        setCharactersCount(data.count)
        setCharacterSearchError(false)
      })
      .catch(err => console.error(err))
  }

  //  searching for a character by name
  const searchCharacterByName = e => {
    if (e.key === 'Enter') {
      setLoading(true)
      setDisplay(false)
      fetch(`https://swapi.dev/api/people/?search=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
          setLoading(false)
          setDisplay(true)
          setCharacters(data.results)
          setCharactersCount(data.count)
          setInputValue(e.target.value)
          setApi(`https://swapi.dev/api/people/?search=${e.target.value}&page=`)
          setCurrentPage(1)
          data.results.length !== 0 ? setCharacterSearchError(false) : setCharacterSearchError(true)
        })
        .catch(err => console.error(err))
    }
  }

  //  fetching data for character's details
   const getCharacterDetails = characterUrl => {
    setLoading(true)
    setDisplay(false)
    fetch(`${characterUrl}`)
      .then(res => res.json())
      .then(async data => {

        let filmsData = []
        let vehiclesData = []
        let starshipsData = []

        await Promise.all([
          ...data.films.map(item =>
          fetch(item)
            .then(res => res.json())
            .then(filmData => filmsData.push(filmData))

          ),
          ...data.vehicles.map(item =>
          fetch(item)
            .then(res => res.json())
            .then(vehicleData => vehiclesData.push(vehicleData))

          ),
          ...data.starships.map(item =>
          fetch(item)
            .then(res => res.json())
            .then(starshipData => starshipsData.push(starshipData))

          ),
          fetch(data.homeworld)
            .then(res => res.json())
            .then(homeworldData => data.homeworld = homeworldData.name)
        ])
        data.films = filmsData
        data.vehicles = vehiclesData
        data.starships = starshipsData

        setCharacterDetails(data)
        setLoading(false)
        setDisplay(true)
      })
      .catch(err => console.log(err))
    }

  return (
    <DataContext.Provider value={{ loading, searchCharacterByName, characters, getData, currentPage, buttonKey, setButtonKey, charactersCount, api, setApi, inputValue, characterSearchError, display, getCharacterDetails, characterDetails }}>
      {children}
    </DataContext.Provider>
  )
}