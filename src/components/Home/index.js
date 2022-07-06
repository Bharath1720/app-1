import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  onClickTryAgain = () => {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_Token')
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const fetchedDataLength = fetchedData.results.length
      //  console.log(Math.floor(Math.random() * fetchedDataLength))
      const randomPoster =
        fetchedData.results[Math.floor(Math.random() * fetchedDataLength)]
      //  console.log(randomPoster)
      const updatedFetchedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      //  console.log(updatedFetchedData)
      this.setState({
        initialPoster: {...updatedFetchedData},
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {initialPoster} = this.state
    const {backdropPath, title, overview} = initialPoster
    return (
      <div>
        {/* <p>{JSON.stringify(initialPoster)}</p> */}
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: '100% 100%',
            height: '50vh',
            width: '100%',
          }}
        >
          <Header />
          <div className="heading-container">
            <h1 className="home-poster-title">{title}</h1>
            <p className="home-poster-overview">{overview}</p>
            <button className="home-poster-play-btn" type="button">
              Play
            </button>
          </div>
          <div>
            <div className="img-bottom-style"> </div>
          </div>
        </div>
      </div>
    )
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

  renderHome = () => {
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
      <>
        <div className="home-bg-container">
          <div className="loading-black-color-container">
            {this.renderHome()}
          </div>
        </div>
        <div className="bottom-container">
          <div className="trending-now-display">
            <TrendingNow />
          </div>
          <div className="trending-now-display">
            <Originals />
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
export default Home
