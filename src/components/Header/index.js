import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'

import './index.css'

class Header extends Component {
  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  render() {
    return (
      <nav className="nav-container">
        <div className="nav-container-elements">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1656594712/Group_7399_wrvd0n.png"
              className="app-logo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-list-items">
            <Link to="/" className="link">
              <li className="header-li">Home</li>
            </Link>
            <Link to="/popular" className="link">
              <li className="header-li">Popular</li>
            </Link>
          </ul>
          <div className="search-container">
            {/* <button type="button">
              <input type="search" />
              <BiSearchAlt2 />
            </button> */}
            <input
              type="search"
              onKeyDown={this.onChangeSearchInput}
              placeholder="search"
            />
            <Link to="/search">
              <button type="button">
                <BiSearchAlt2 />
              </button>
            </Link>

            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1656598609/Mask_Group_yc5cws.png"
              className="app-logo"
              alt="p logo"
            />
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
