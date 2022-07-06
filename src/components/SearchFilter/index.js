import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class SearchFilter extends Component {
  state = {
    searchText: '',
    searchMovies: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  searchInput = value => {
    this.setState(
      {
        searchText: value,
      },
      this.getSearchMovies,
    )
  }

  getSearchMovies = async () => {
    this.setState({
      isLoading: true,
    })
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_Token')
    console.log(jwtToken)
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        searchMovies: updatedData,
        isLoading: false,
      })
    }
  }

  renderMoviesList = () => {
    const {searchMovies} = this.state
    return (
      <div className="search-filter-bg-container">
        <div className="search-filter-movies-list-container">
          <ul className="search-filter-ul-container">
            {searchMovies.map(each => (
              <Link to={`/movies/${each.id}`}>
                <li className="search-filter-li-item" key={each.id}>
                  <img
                    className="search-poster"
                    src={each.posterPath}
                    alt={each.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={60} width={60} />
    </div>
  )

  renderNotfoundMovies = () => {
    const {searchText} = this.state
    return (
      <div className="search-heading-container">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657092588/Group_7394_jzwy1v.png"
          alt="no movies"
          className="search-not-found-image"
        />
        <h1 className="search-not-found-heading">
          Your search for {searchText} did not find any matches.
        </h1>
      </div>
    )
  }

  renderSearchList = () => {
    const {searchMovies, isLoading} = this.state
    let result
    if (isLoading) {
      result = this.renderLoading()
    } else {
      result =
        searchMovies.length === 0
          ? this.renderNotfoundMovies()
          : this.renderMoviesList()
    }
    return result
  }

  render() {
    return (
      <div className="search-filter-bg-container">
        <Header searchInput={this.searchInput} />
        {this.renderSearchList()}
      </div>
    )
  }
}
export default SearchFilter
