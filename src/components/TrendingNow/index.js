import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import SlickMovieCard from '../SlickMovieCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
  state = {
    trendingNow: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
  }

  onClickTryAgain = () => {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_Token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      //  console.log(data)
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trendingNow: updatedData,
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
    const {trendingNow} = this.state
    return <SlickMovieCard movies={trendingNow} />
  }

  renderTrendingNow = () => {
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
      <div>
        <h1 className="trending-now-heading">Trending Now</h1>
        {this.renderTrendingNow()}
      </div>
    )
  }
}
export default TrendingNow
