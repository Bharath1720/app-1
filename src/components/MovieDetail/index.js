import Header from '../Header'
import './index.css'

const movieDetail = props => {
  const {movieDetails} = props
  const {
    backdropPath,
    title,
    adult,
    runtime,
    releaseDate,
    overview,
  } = movieDetails
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  const year = date.getFullYear()
  return (
    <div
      className="movie-background-info-image"
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: '100% 100%',
        width: '1440px',
        height: '500px',
      }}
    >
      <Header />
      <div className="movie-info-content-container">
        <h1 className="movie-info-title">{title}</h1>
        <div className="runtime-container">
          <p className="movie-info-hrs-min">{`${hours}h ${minutes}m `}</p>
          <p className="movie-info-a-ua">{adult ? 'A' : 'U/A'}</p>
          <p className="movie-info-year">{year}</p>
        </div>
        <p className="movie-info-overview">{overview}</p>
        <button className="home-poster-play-btn" type="button">
          Play
        </button>
      </div>
    </div>
  )
}

export default movieDetail
