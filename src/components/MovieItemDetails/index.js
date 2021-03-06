import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Link} from 'react-router-dom'
import MovieDetail from '../MovieDetail'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_Token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        originalLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))
      // console.log(updatedData)
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      // console.log(genresData)
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      // console.log(updatedSimilarData)
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )

      // console.log(updatedLanguagesData)
      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        spokenLanguages: updatedLanguagesData,
        similarMovies: updatedSimilarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="detail-loader">
      <FailureView onClickTryAgain={this.onClickTryAgain} />
    </div>
  )

  renderLoadingView = () => (
    <div className="detail-loader">
      <LoadingView style={{height: '100vh'}} />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const newMovieDetails = {...movieDetails[0]}
    const {releaseDate, count, rating, budget} = newMovieDetails
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = new Date(releaseDate)
    const monthName = months[d.getMonth()]
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const day = date.getDay().toString()
    let dateEndingWord
    if (day.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }
    // const {posterPath, backdropPath, id} = movieDetails
    return (
      <>
        <div className="movie-details-display-parent-container">
          <div className="movie-details-display-container">
            {movieDetails.map(each => (
              <MovieDetail movieDetails={each} key={each.id} />
            ))}
          </div>
        </div>

        <div className="additional-movie-info-container">
          <ul>
            <h1 className="movie-info-genre-heading">Generes</h1>
            {genres.map(eachGenre => (
              <li className="movie-info-each-genre" key={eachGenre.id}>
                {eachGenre.name}
              </li>
            ))}
          </ul>
          <ul>
            <h1 className="movie-info-genre-heading">Audio Available</h1>
            {spokenLanguages.map(eachAudio => (
              <li className="movie-info-each-genre" key={eachAudio.id}>
                {eachAudio.language}
              </li>
            ))}
          </ul>
          <div>
            <h1 className="movie-info-rating-count-heading">Rating Count</h1>
            <p className="movie-info-rating-count">{count}</p>
            {/* <p>{JSON.stringify(movieDetails)}</p> */}
            {/* <p>{JSON.stringify(newMovieDetails)}</p> */}
            <h1 className="movie-info-rating-avg-heading">Rating Average</h1>
            <p className="movie-info-rating">{rating}</p>
          </div>
          <div>
            <h1 className="movie-info-budget-heading">Budget</h1>
            <p className="movie-info-budget">{budget}</p>
            {/* <p>{JSON.stringify(movieDetails)}</p> */}
            {/* <p>{JSON.stringify(newMovieDetails)}</p> */}
            <h1 className="movie-info-release-date">Release Date </h1>
            <span className="movie-info-date">{day}</span>
            <span className="movie-info-date-end">{dateEndingWord}</span>
            <span className="movie-info-month-name">{monthName}</span>
            <span className=" movie-info-year">{year}</span>
          </div>
        </div>
        <div className="similar-movies-container">
          <ul className="popular-ul-container similar-ul-container">
            {similarMovies.map(each => (
              <Link to={`/movies/${each.id}`}>
                <li className="popular-li-item" key={each.id}>
                  <img
                    className="popular-poster"
                    src={each.posterPath}
                    alt={each.title}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="movie-info-footer-container">
          <Footer />
        </div>
      </>
    )
  }

  renderMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderMovies()}</>
  }
}
export default MovieItemDetails
