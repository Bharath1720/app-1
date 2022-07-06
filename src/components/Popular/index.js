import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickTryAgain = () => {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_Token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        title: each.title,
      }))
      this.setState({
        popularMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="detail-loader">
      <LoadingView testid="loader" style={{height: '100vh'}} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <FailureView onClickTryAgain={this.onClickTryAgain} />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <ul className="popular-ul-container">
        {popularMovies.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <li className="popular-li-item">
              <img
                className="popular-poster"
                src={each.posterPath}
                alt={each.title}
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderPopularMoviesView = () => {
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
    return (
      <div className="main-popular-bg-black-container">
        <Header />
        {this.renderPopularMoviesView()}
        <Footer />
      </div>
    )
  }
}
export default Popular
