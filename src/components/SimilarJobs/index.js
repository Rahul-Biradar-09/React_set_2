import {FaStar} from 'react-icons/fa'

import {IoLocationSharp} from 'react-icons/io5'

import {IoBriefcaseSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem
  return (
    <div className="similar-Items">
      <div className="J1-top-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="company-image1"
        />
        <div className="J4-container">
          <h1 className="job-title1">{title}</h1>
          <div className="rating-container1">
            <FaStar className="star-icon1" />
            <p className="rating-text1">{rating}</p>
          </div>
        </div>
      </div>
      <div className="Description-container">
        <div className="Description-block">
          <p className="similar-head">Description</p>
          <p className="similar-para">{jobDescription}</p>
        </div>
        <div className="location-employement-container2">
          <div className="L1-container">
            <IoLocationSharp className="work-icon1" />
            <p className="work-text1">{location}</p>
          </div>
          <div className="L1-container">
            <IoBriefcaseSharp className="work-icon1" />
            <p className="work-text1">{employmentType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
