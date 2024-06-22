import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {companyLogoUrl, employmentType, jobDescription, location, rating, title} = eachItem
  return (
    <div className="similar-Items">
      <div className="J1">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="company-image"
        />
        <div className="J2 J4">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <FaStar className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <p className="similar-head">Description</p>
      <p className="similar-para">
       {jobDescription}
      </p>
      <div className="location-employement-container">
        <div className="L1">
          <IoLocationSharp className="work-icon" />
          <p className="work-text">{location}</p>
        </div>
        <div className="L1">
          <IoBriefcaseSharp className="work-icon" />
          <p className="work-text">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
