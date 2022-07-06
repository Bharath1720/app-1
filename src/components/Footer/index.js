import {ImGoogle, ImTwitter} from 'react-icons/im'
import {GrInstagram} from 'react-icons/gr'
import {BsYoutube} from 'react-icons/bs'

import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <button type="button" className="icon-button">
        <ImGoogle />
      </button>
      <button type="button" className="icon-button">
        <ImTwitter />
      </button>
      <button type="button" className="icon-button">
        <GrInstagram />
      </button>
      <button type="button" className="icon-button">
        <BsYoutube />
      </button>
    </div>
    <p className="contact-us-footer">Contact us </p>
  </>
)
export default Footer
